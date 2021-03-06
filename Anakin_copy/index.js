//TODOS: check the gsap and scrollmagic
// how to use timelineMax

gsap.registerPlugin(CSSRulePlugin)
const controller = new ScrollMagic.Controller()

const rangeDetection = (ele, callback) => {
    const element = document.querySelectorAll(ele)[0].getBoundingClientRect()
    Yposition = element.top
    const Y1 = window.pageYOffset + Yposition
    if( window.pageYOffset >= Y1){
        callback();
    }
}

const yellowCrossTween = gsap.fromTo(".intro .yellow_cross", {scale: 0}, {scale: 1, duration: 1})

const yellowCrossScence = new ScrollMagic.Scene({
                            triggerElement: ".intro .yellow_cross"
                        })
                        .setTween(yellowCrossTween)
                        .addTo(controller)


const taglineTween = gsap.timeline()
taglineTween.staggerFrom(".tagline h1", 0.5, {y: 200}, 0.3)
taglineTween.staggerFrom(".tagline p", 0.5, {y: 200}, 0.3)
taglineTween.staggerFrom(".tagline div", 0.5, {y: 200}, 0.3)

const taglineScence = new ScrollMagic.Scene({
                        triggerElement: ".summary-column"
                    })
                    .setTween(taglineTween)
                    .addTo(controller)

const feedTween = gsap.timeline()
feedTween.staggerFrom(".left-1--item-1", 0.7, {y: 500}, 0.3)
feedTween.staggerFrom(".left-1--item-2", 0.7, {y: 500}, 0.3)
feedTween.staggerFrom(".feed--right-2", 0.7, {y: 500}, 0.3)
feedTween.staggerFrom(".left-2--item-1", 0.7, {y: 500}, 0.3)
feedTween.staggerFrom(".left-2--item-2", 0.7, {y: 500}, 0.3)
feedTween.staggerFrom(".left-2--item-3", 0.7, {y: 500}, 0.3)

const feedScence = new ScrollMagic.Scene({
                        triggerElement: ".case_studies--more_info"
                  })
                  .setTween(feedTween)
                  .addTo(controller)

const sliceTween = gsap.timeline()
sliceTween.staggerFrom(".slice-1", 0.5, {opacity: 0}, 0.3)
sliceTween.staggerFrom(".slice-2", 0.5, {opacity: 0}, 0.3)
sliceTween.staggerFrom(".slice-3", 0.5, {opacity: 0}, 0.3)
sliceTween.staggerFrom(".slice-4", 0.5, {opacity: 0}, 0.3)
const sliceScence = new ScrollMagic.Scene({
                    triggerElement: ".slice"
                  })
                   .setTween(sliceTween)
                   .addTo(controller)


window.addEventListener("scroll",()=>{
    rangeDetection(".tagline h1", ()=> {
        yellowCrossScence.remove()
    })
    rangeDetection(".feature_works", ()=>{
        taglineScence.remove()
    })
    rangeDetection(".footer--logo", ()=>{
        feedScence.remove()
        console.log("feedScence removed")
    })
    rangeDetection(".footer--logo", ()=>{
        sliceScence.remove()
    })
},false)


function initAnimation (){
    gsap.fromTo(".lazyloaded", {opacity:0}, {opacity:1, duration: 1})
}

initAnimation()

const removeActive = (arr) => {
    if(arr.classList.contains("active")){
        arr.classList.remove("active")
    }
}

const progressBarAnim = (ele) => {
    const timeline = gsap.timeline()
    const eleColor = ele.dataset.color
    timeline.fromTo(ele, {width: "30%", backgroundColor: "black"}, {backgroundColor: eleColor, width: "100%", duration: 0.5})
    timeline.fromTo(ele, {backgroundColor: eleColor, width: "100%"}, {width: "30%", backgroundColor: "black", duration: 0.3})
}

const opacityAnim = (ele) => {
    gsap.fromTo(ele, {opacity:0}, {opacity:1, duration:1})
}
const logoArr = document.querySelectorAll(".feature_work--logo");
const btArr = document.querySelectorAll(".feature_work--bt")
const detailsArr = document.querySelectorAll(".feature_work--detail")
const progressArr = document.querySelectorAll(".progress")

const feature_workOnClick = (ele) => {
    const reg = /work--*/
    const arr = ele.classList

    arr.forEach(i => {
        if (i.match(reg)){
            logoArr.forEach(logo=>{
                removeActive(logo)
                if (logo.classList.contains(i)){
                    logo.classList.add("active")
                    opacityAnim(logo)
                }
            })
            btArr.forEach(bt=>{
                removeActive(bt)
                if (bt.classList.contains(i)){
                    bt.classList.add("active")
                }
            })
            detailsArr.forEach(detail=>{
                removeActive(detail)
                if (detail.classList.contains(i)){
                    detail.classList.add("active")
                }
            })
            progressArr.forEach(bar=>{
                progressBarAnim(bar)
            })
        }
    })

}

const activeAutoChange = (arr, animFunc) => {
    let activeIndex;
    arr.forEach((ele, i) => {
        if(ele.classList.contains("active")){
            activeIndex = i
            removeActive(ele)
        }
    })
    
    if(activeIndex+1>arr.length-1){
        activeIndex = 0
    } else{
        activeIndex ++; 
    }
    arr[activeIndex].classList.add("active")

    if(animFunc){
        animFunc(arr[activeIndex])
    }
}

setInterval(()=> {
    activeAutoChange(btArr)
    activeAutoChange(logoArr, opacityAnim)
    activeAutoChange(detailsArr)
    activeAutoChange(progressArr, progressBarAnim)
}, 3000)