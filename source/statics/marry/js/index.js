$(document).ready(function () {
    $(function() {

        $('#sb-slider').slicebox({
            slicesCount : 15,
            sequentialRotation : true,
            sequentialFactor : 50,
            speed3d : 250,
            cuboidsRandom : true
        });
        if( !Modernizr.csstransforms3d ) {
            $('#sb-note').show();
            $('body').append(
                $('script').attr( 'type', 'text/javascript' ).attr( 'src', 'lib/jquery.easing.1.3.js' ));
        }
    });
    //音乐播放器
    var ap = new APlayer({
        element: document.getElementById('bg-player'),
        narrow: true,
        autoplay: true,
        showlrc: false,
        mutex: true,
        playlist: false,
        theme: '#e6d0b2',
        music: [{
            title: '',
            author: '',
            url: 'https://ohuxfnzjy.qnssl.com/audio/hexo/2016/Bruno%20Mars%20-%20Marry%20You.mp3',
            pic: 'https://ohuxfnzjy.qnssl.com/image/hexo/Preparation.jpg'
        }, {
            title: '',
            author: '',
            url: 'https://ohuxfnzjy.qnssl.com/audio/hexo/2016/Stewart%20Mac%20-%20I%20Love%20You.mp3',
            pic: 'https://ohuxfnzjy.qnssl.com/image/hexo/Preparation.jpg'
        }]
    });
    ap.volume(0.2);//音量
});