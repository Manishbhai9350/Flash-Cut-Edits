import { Works } from "./data.js";
console.clear();
gsap.registerPlugin(ScrollTrigger, SplitType);

// ScrollTrigger.create({
//   trigger:".us-image .img",
//   start:'top top',
//   end:'',
//   markers:true,
//   pin:true,
// })


// document.addEventListener("mousemove", (e) => {
//   const x = e.clientX,
//     y = e.clientY;
//   gsap.to(".mouse-follower", {
//     top: y,
//     left: x,
//     duration: 0.5,
//   });
// });

// const LineCons = gsap.utils.toArray(".line-con");
// LineCons.forEach((LineCon) => {
//   const Line = LineCon.querySelector(":scope > .line");
//   LineCon.addEventListener("mouseenter", (e) => {
//     gsap.killTweensOf(".mouse-follower");
//     gsap.to(".mouse-follower", {
//       opacity: 0,
//     });
//     gsap.set(Line, {
//       transformOrigin: "left",
//     });
//     gsap.to(Line, {
//       scaleX: 1,
//       duration: 0.5,
//     });
//   });
//   LineCon.addEventListener("mouseleave", (e) => {
//     gsap.killTweensOf(".mouse-follower");
//     gsap.set(Line, {
//       transformOrigin: "right",
//     });
//     gsap.to(".mouse-follower", {
//       opacity: 1,
//       delay: 0.3,
//       overwrite: true,
//     });
//     gsap.to(Line, {
//       onComplete() {
//         gsap.set(Line, {
//           transformOrigin: "left",
//         });
//       },
//       scaleX: 0,
//       duration: 0.5,
//     });
//   });
// });

const Hamburger = document.querySelector(".hamburger");

let IsMobileNavOpen = false;
Hamburger.addEventListener("click", () => {
  gsap.killTweensOf([
    ".mobile-nav-items",
    ".hamburger .line:first-child",
    ".hamburger .line:last-child",
  ]);
  if (!IsMobileNavOpen) {
    gsap.to(".hamburger", {
      gap: 0,
    });
    gsap.to(".hamburger .line:first-child", {
      rotate: 45,
    });
    gsap.to(".hamburger .line:last-child", {
      rotate: -45,
    });
    gsap.to(".mobile-nav-items", {
      display: "flex",
      opacity: 1,
    });
  } else {
    gsap.to(".hamburger", {
      gap: 15,
    });
    gsap.to(".hamburger .line:first-child", {
      rotate: 0,
    });
    gsap.to(".hamburger .line:last-child", {
      rotate: 0,
    });
    gsap.to(".mobile-nav-items", {
      opacity: 0,
      onComplete() {
        gsap.set(".mobile-nav-items", {
          display: "none",
        });
      },
    });
  }
  IsMobileNavOpen = !IsMobileNavOpen;
});



// const WorksCon = document.querySelector(".works-con");

// function GetTags(Tags) {
//   let TagsBuffer = "";
//   Tags.forEach((Tag) => {
//     TagsBuffer += `<div class="tag">${Tag.trim()}</div>`;
//   });
//   return TagsBuffer;
// }
// function ShowWorks() {
//   let Clutter = "";
//   Works.forEach((Work) => {
//     let WorkBuffer = `
//     <div class="work">
//               <div class="work-content">
//                 <div class="work-data work-data-video">
//                   <div class='video-status'>
//                   <div class='status-icon-play'></div>
//                   <div class='status-icon-pause'>
//                   <div class='pause-line'></div>
//                   <div class='pause-line'></div>
//                   </div>
//                   </div>
//                   <video loop  src="./public/editing-samples/${Work.type}s/${
//       Work.category
//     }/${Work.type}${Work.id}.mp4"></video>
//                 </div>
//                 <div class="work-info">
//                   <div class="work-tags">
//                   ${GetTags(Work.tags)}
//                   </div>
//                   <p>Tech Reel Edit - Precision, Flow, and Impact in Every Frame</p>
//                 </div>
//               </div>
//           </div>
//     `;
//     Clutter += WorkBuffer;
//   });
//   WorksCon.innerHTML = "";
//   WorksCon.innerHTML = Clutter;
// }


// ShowWorks()

// const WorkDataVideos = gsap.utils.toArray(".work-data-video");
// WorkDataVideos.forEach((Item) => {
//   const Video = Item.querySelector("video");
//   const PlayIcon = Item.querySelector(".status-icon-play");
//   const PauseIcon = Item.querySelector(".status-icon-pause");
//   const Parent = Item.parentElement;
//   Parent.setAttribute('playing','false')
  
//   function PlayVideo(){
//     gsap.killTweensOf(Item);
//     Video.play();
//     Parent.setAttribute('playing',!Video.paused)
//     gsap.to(PlayIcon,{opacity:0})
//     gsap.to(PauseIcon,{opacity:1})
//     gsap.to(Item, {
//       filter: "grayscale(0%)",
//     });
//   }
//   function PauseVideo(){
//     {
//       gsap.killTweensOf(Item);
//       Video.pause();
//       Parent.setAttribute('playing',!Video.paused)
//       gsap.to(PlayIcon,{opacity:1})
//       gsap.to(PauseIcon,{opacity:0})
//       gsap.to(Item, {
//         filter: "grayscale(100%)",
//       });
//     }
//   }

  
//   Parent.addEventListener("click",e => {
//     const IsPlaying = Parent.getAttribute('playing') == 'true'
//     if(IsPlaying){
//       PauseVideo()
//     } else {
//       PlayVideo()
//     }
//   });
//   Parent.addEventListener("mouseenter",PlayVideo);
//   Parent.addEventListener("mouseleave", PauseVideo);
// });

// // Animations

// const SplitHeadings = gsap.utils.toArray(".split-text-heading");

// SplitHeadings.forEach((Heading) => {
//   const HeadingSplits = new SplitType(Heading);

//   gsap.set(HeadingSplits.chars, {
//     y: "100%",
//   });

//   ScrollTrigger.create({
//     trigger: Heading,
//     start: "top 60%",
//     end: "top 10%",
//     onEnter() {
//       gsap.killTweensOf(HeadingSplits.chars);
//       gsap.to(HeadingSplits.chars, {
//         y: 0,
//         stagger: 0.01,
//         duration: 0.4,
//       });
//     },
//     onLeave() {
//       gsap.killTweensOf(HeadingSplits.chars);
//       gsap.to(HeadingSplits.chars, {
//         y: "100%",
//         stagger: 0.01,
//         duration: 0.4,
//       });
//     },
//     onLeaveBack() {
//       gsap.killTweensOf(HeadingSplits.chars);
//       gsap.to(HeadingSplits.chars, {
//         y: "100%",
//         stagger: 0.01,
//         duration: 0.4,
//       });
//     },
//     onEnterBack() {
//       gsap.killTweensOf(HeadingSplits.chars);
//       gsap.to(HeadingSplits.chars, {
//         y: 0,
//         stagger: 0.01,
//         duration: 0.4,
//       });
//     },
//   });

//   gsap.set(Heading, {
//     overflow: "hidden",
//     position: "relative",
//   });
// });

// const DescriptionSplits = new SplitType(".description");

// gsap.set(DescriptionSplits.chars, {
//   opacity: 0.3,
// });

// const UsLines = gsap.utils.toArray(".why-us .us-line");

// gsap.to(DescriptionSplits.chars, {
//   opacity: 1,
//   stagger: 0.01,
//   duration: 0.5,
//   ease: "elastic.inOut(1.5)",
//   scrollTrigger: {
//     trigger: ".description-con",
//     start: "top 70%",
//     end: "center 40%",
//     scrub: 2,
//   },
// });

// ScrollTrigger.create({
//   trigger: ".why-us",
//   start: "top 60%",
//   end: `+=${innerHeight}`,
//   // pin: true,
//   scrub: true,
//   onUpdate: ({ progress }) => {
//     UsLines.forEach((line, index) => {
//       const threshold = (index + 1) / UsLines.length; // Define when each line should fade in
//       let IThress = 1 / UsLines.length
//       let opacity =  0.3; // Update opacity based on progress
//       if(progress >= threshold && progress < (IThress + threshold)){
//         opacity = 1
//       }
//       gsap.to(line, { opacity });
//     });
//   },
// });



const SubChildOpenerCon = document.querySelectorAll('.sub-child-opener-con')

SubChildOpenerCon.forEach((Con,i) => {
    const Opener = Con.querySelector('.sub-child-opener')
    const SubChilds = Con.querySelector('.sub-child-con')
    Opener.addEventListener('click', (e) => {
        e.preventDefault()
        Con.classList.toggle('active')
        SubChildOpenerCon.forEach((Con,j) => {
          if(i !== j){
            Con.classList.remove('active')
          }
        })
    })
    document.addEventListener('click', (e) => {
        if (!Con.contains(e.target) && Con.classList.contains('active'))  // if the target is not a descendant of the container
        SubChildOpenerCon.forEach(Con => Con.classList.remove('active'))
    })
})

