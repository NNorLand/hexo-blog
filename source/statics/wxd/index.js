var VM = new Vue({
  el: '#app',
  data: {
    problemAllNum: 20, //每轮需要答题数
    showanimation: false, //显示 答题页动画
    showQuestion: false, //显示 答题
    showQuestionEnd: false, //显示 答题结束
    currQuestionData: [], //本轮答题题库
    problem: '', //当前题目数据
    problemNumber: '', //当前题所答第N题
    chooseKey: [], //当前题选择的KEY
    rightLen: 0, //每轮答对的题数
    ifShowErr: false, //显示 答错时提示正确答案
    ifNeedTime: 1, //0：不需要计时； 1：正计时； 2：每题答题限时倒计时（计时结束再进入下一题）； 3：每轮答题限时倒计时（计时结束不再进入下一题即答题结束）；
    baseTime: 10, //倒计时开始时间，秒
    timer: null, //定时器
    curTime: 0, //当前 用时 或 倒计时
    timing: 0,
    rafId: '',
    codeId: null, //开始答题时获得的ID
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    /***************** 答题相关功能 *****************/

    // 返回至首页
    goIndex() {
      this.showQuestion = false;
      this.resetQuestionData();
    },
    // 重置答题数据
    resetQuestionData() {
      this.problem = '';
      this.chooseKey = [];
      this.ifShowErr = false;
      this.showanimation = true;
      // 再来一次时隐藏结果页
      this.showQuestionEnd = false;
    },
    // 初始答题数据（1：每轮开始答题 2：切换下题）
    updateInit(type) {
      if (type === 1) {
        if (this.ifNeedTime == 1) {
          this.timing = 0;
          // 开始计时
          this.changeTime();
        }
        if (this.ifNeedTime == 3) {
          this.curTime = this.baseTime;
          this.timer ? clearInterval(this.timer) : '';
          this.timer = setInterval(this.showTime, 1000);
        }
        // 每轮开始答题
        this.problemNumber = 1;
        this.rightLen = 0;
        this.currQuestionData = [].concat(questionJson).sort(function (a, b) {
          return 0.5 - Math.random();
        });
        // console.log(questionData);
        // console.log(this.currQuestionData);
      } else if (type === 2) {
        // 切换下题
        this.problemNumber++;
      }
      this.resetQuestionData();
    },
    // 开始答题 / 进入下一题 载入题库
    answerQuestionDo() {
      const problem = _.cloneDeep(this.currQuestionData[this.problemNumber - 1]);
      problem.right = problem.answer[0];
      problem.answer = problem.answer.sort(() => Math.random() - 0.5);
      this.problem = problem;
      // console.log(this.problem);
      console.log('当前是正确选项:' + this.problem.right);
      this.showQuestion = true;
      if (this.ifNeedTime == 2) {
        this.curTime = this.baseTime;
        this.timer ? clearInterval(this.timer) : '';
        this.timer = setInterval(this.showTime, 1000);
      }
    },
    // 选择答案
    chooseAnswer(key) {
      this.showanimation = false;
      // 答题错误展示错误答案时 或 答题结束后 不给选择及点击下一题
      if (this.ifShowErr || this.showQuestionEnd) {
        return;
      }
      if (this.chooseKey.indexOf(key) == -1) {
        this.chooseKey.splice(0, 1);
        console.info('key', key);
        this.chooseKey.push(key);
      } else {
        this.chooseKey.splice(0, 1);
      }

      // console.log(this.chooseKey);
    },
    // 提交当前选择答案
    submitAnswer() {
      if (this.showQuestionEnd == true) {
        return;
      }
      // 答题错误展示错误答案时 或 答题结束后 不给选择及点击下一题
      if (this.ifShowErr || this.showQuestionEnd) {
        return;
      }
      if (!this.chooseKey.length) {
        // textToast('请选择答案再提交');
        alert('请选择答案再提交');
        return false;
      }
      // console.log(this.chooseKey);
      if (this.ifNeedTime == 2) {
        clearInterval(this.timer);
      }
      // 正确答案 未用 英文逗号隔开，判断代码，如：ABC
      // if(this.chooseKey.join('').length != this.problem.right.length){
      // 正确答案 用 英文逗号隔开，判断代码，如：A,B,C

      for (var i = 0, L = this.chooseKey.length; i < L; i++) {
        if (this.problem.right.indexOf(this.chooseKey[i]) == -1) {
          // console.log('错误');
          this.nextQuestionDo();
          break;
        }
        if (i == L - 1) {
          console.log('正确');
          this.rightLen++;
          // 答对不提示对错
          // this.goNextQuestion();
          // 答对也提示对错
          this.nextQuestionDo();
        }
      }
    },
    // 准备进入下一题
    nextQuestionDo() {
      this.ifShowErr = true;
    },
    // 进入下一题
    goNextQuestion() {
      if (this.showQuestionEnd == true) {
        return;
      }
      // console.log('当前题答题结束,正确数' + this.rightLen);
      if (this.problemNumber >= this.problemAllNum) {
        if (this.ifNeedTime == 3) {
          clearInterval(this.timer);
        }
        // 答题结束
        this.questionOver();
      } else {
        // 进入下一题
        this.updateInit(2);
        this.answerQuestionDo();
      }
    },
    // 答题结束
    questionOver() {
      // 答题结束
      this.showQuestionEnd = true;
    },
    // 倒计时
    showTime() {
      this.curTime--;
      if (this.curTime == 0) {
        this.showanimation = false;
        clearInterval(this.timer);
        if (this.ifNeedTime == 2) {
          if (!this.chooseKey.length) {
            // 当前题答题错误
            this.nextQuestionDo();
          } else {
            // 倒计时结束前用户有选择选项的，则自动提交当前选择答案
            this.submitAnswer();
          }
        }
        if (this.ifNeedTime == 3) {
          if (!this.chooseKey.length) {
            this.ifShowErr = true;
          } else {
            // 倒计时结束前用户有选择选项的，则自动提交当前选择答案
            this.submitAnswer();
          }
        }
      }
    },
    // 计时
    changeTime(k) {
      // console.log(k);
      if (!this.timing && k) {
        this.timing = k;
      }
      this.rafId = requestAnimationFrame(this.changeTime);
      this.curTime = ((k - this.timing) / 1000).toFixed(2);
      this.curTime = parseInt((k - this.timing) / 1000);
      // console.log(this.curTime);
      this.$nextTick(() => {
        if (this.showQuestionEnd == true) {
          cancelAnimationFrame(this.rafId);
        }
      });
    },
    closeResult() {
      this.showQuestionEnd = false;
    },

    /***************** 请求后台数据 相关功能 *****************/

    // 开始答题-从后台获取 当前答题ID
    startDo() {
      this.updateInit(1);
      this.answerQuestionDo();
    },
  },
});
