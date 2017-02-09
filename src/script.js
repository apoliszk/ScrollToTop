(function () {
    var moveToTopBtn = document.createElement('div');
    moveToTopBtn.classList.add('move-to-top');
    document.body.appendChild(moveToTopBtn);

    var animationFn = window.requestAnimationFrame;
    if (animationFn == undefined) {
        animationFn = function (fn) {
            setInterval(fn, 100);
        };
    }

    moveToTopBtn.addEventListener('transitionend', function (e) {
        if (e.propertyName == 'opacity' && getComputedStyle(moveToTopBtn).opacity == '0') { // 火箭升空动画结束，重置按钮状态
            moveToTopBtn.style.transition = 'none';
            moveToTopBtn.classList.remove('show');
            moveToTopBtn.classList.remove('moving');
        }
    });

    moveToTopBtn.addEventListener('click', function () {
        moveToTopBtn.classList.add('moving');
        easeMoveToTop();
    });

    function easeMoveToTop() {
        window.removeEventListener('scroll', scrollHandler);
        animationFn(function () {
            var delta = Math.max(document.body.scrollTop * .4, 9);
            if (document.body.scrollTop > delta) {
                document.body.scrollTop = document.body.scrollTop - delta;
                easeMoveToTop();
            } else {
                document.body.scrollTop = 0;
                window.addEventListener('scroll', scrollHandler);
            }
        });
    }

    window.addEventListener('scroll', scrollHandler);

    function scrollHandler() {
        moveToTopBtn.style.transition = '';
        if (window.scrollY > 0) {
            moveToTopBtn.classList.add('show');
        } else {
            moveToTopBtn.classList.remove('show');
        }
    }
})();
