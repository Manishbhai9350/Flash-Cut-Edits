import { WorkData } from "./work_data.js";

document.addEventListener("DOMContentLoaded", () => {
  console.clear();
  const WorkInfo = JSON.parse(localStorage.getItem("work_data"));
  if (!WorkInfo) return;
  const { Type, SubType } = WorkInfo;

  const Data = WorkData[Type];
  const Categories = Data.Categories;
  const Category = Categories[SubType];
  const Works = Category.works
  const Title = Data.title

  const TitleText = document.querySelector('.works-title')
  const CategoryText = document.querySelector('.works-sub-type')
  const WorksContentCon = document.querySelector('.works-content')

  CategoryText.innerHTML = Category.title
  TitleText.innerHTML = Title

  const IsVideo = Data.type == 'video'

  if(IsVideo){
    let Clutter = ''
    Works.forEach(Work => {
      const Tag = `
      <div playing="false" class="video-item">
            <div class="video">
              <iframe
                style="width: 100%; height: 100%"
                src="https://drive.google.com/file/d/${Work.id}/preview"
                allow="autoplay"
              ></iframe>
            </div>
            <div class="content">
              <div class="tag">
                <p>${Work.tag}</p>
              </div>
            </div>
          </div>
      `
      Clutter += Tag
    })
    WorksContentCon.innerHTML = Clutter
  } else {
    let Clutter = ''
    console.log(Works)
    Works.forEach(Work => {
      const Tag = `
      <div class="thumbnail-item">
            <div class="thumbnail">
              <img src="${Work.img}" alt="">
            </div>
            <div class="content">
              <div class="tag">
                <p>${Work.tag}</p>
              </div>
            </div>
      </div>
        `
        Clutter += Tag
    })
    WorksContentCon.innerHTML = Clutter
  }

  

















  const Hamburger = document.querySelector(".hamburger");

  let IsMobileNavOpen = false;

  function OpenNav() {
    IsMobileNavOpen = true;
    gsap.killTweensOf([
      ".mobile-nav-items",
      ".hamburger .line:first-child",
      ".hamburger .line:last-child",
    ]);
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
  }

  function CloseNav() {
    IsMobileNavOpen = false;
    gsap.killTweensOf([
      ".mobile-nav-items",
      ".hamburger .line:first-child",
      ".hamburger .line:last-child",
    ]);
    // CloseServices();
    // CloseGraphics();
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

  Hamburger.addEventListener("click", () => {
    if (!IsMobileNavOpen) {
      OpenNav();
    } else {
      CloseNav();
    }
  });

  window.addEventListener("scroll", () => {
    if (IsMobileNavOpen) {
      CloseNav();
    }
  });

  //   const GraphicDesignCon = document.querySelector(".mobile-nav .item.graphic");
  //   const GraphicContent = GraphicDesignCon.querySelector(".item-content");
  //   const GraphicData = GraphicDesignCon.querySelector(".item-data");

  //   const DataHeight = 96;
  //   const ContentHeight = 50;

  //   function CloseGraphics() {
  //     GraphicDesignCon.setAttribute("closed", "true");
  //     gsap.to(GraphicDesignCon.querySelector(".drop-down"), {
  //       rotate: 0,
  //     });
  //     gsap.to(GraphicDesignCon, {
  //       height: ContentHeight,
  //     });
  //   }

  //   GraphicContent.addEventListener("click", (e) => {
  //     const IsClosed = GraphicDesignCon.getAttribute("closed") == "true";
  //     GraphicDesignCon.setAttribute("closed", !IsClosed);
  //     if (IsClosed) {
  //       gsap.to(GraphicDesignCon.querySelector(".drop-down"), {
  //         rotate: 180,
  //       });
  //       gsap.to(GraphicDesignCon, {
  //         height: ContentHeight + DataHeight,
  //       });
  //     } else {
  //       CloseGraphics();
  //     }
  //   });

  //   const ServiceCon = document.querySelector(".item.services");
  //   const ServiceContent = ServiceCon.querySelector(".item-content");
  //   const ServiceItemsCon = ServiceCon.querySelector(".item-data");
  //   const ServiceItems = ServiceItemsCon.querySelectorAll(".item");

  //   let ServiceHeight = 52;
  //   let ServiceContentHeight = 56;
  //   let ListenerAdded = false;
  //   let ServiceChildHeights = [];
  //   let ContainerHeight = ServiceContentHeight;
  //   let MaxHeight = 0;
  //   function CloseServices() {
  //     ServiceItems.forEach((Item) => {
  //       gsap.to(Item, {
  //         height: ServiceHeight,
  //       });
  //       gsap.to(Item.querySelector(".drop-down"), {
  //         rotate: 0,
  //       });
  //       Item.setAttribute("closed", "true");
  //     });
  //     ContainerHeight = ServiceContentHeight;
  //     ServiceCon.setAttribute("closed", "true");
  //     gsap.to(ServiceContent.querySelector(".drop-down"), {
  //       rotate: 0,
  //     });
  //     gsap.to(ServiceCon, {
  //       height: ContainerHeight,
  //     });
  //   }

  //   function AddLister() {
  //     ServiceItems.forEach((Item, idx) => {
  //       const ItemContent = Item.querySelector(".item-content");
  //       const Child = Item.querySelector(".item-data");
  //       ItemContent.addEventListener("click", () => {
  //         let IsClosed = Item.getAttribute("closed") == "true";
  //         Item.setAttribute("closed", !IsClosed);
  //         if (!IsClosed) {
  //           gsap.to(Item, {
  //             height: ServiceChildHeights[idx].closed,
  //           });
  //           gsap.to(Item.querySelector(".drop-down"), {
  //             rotate: 0,
  //           });
  //           CompressService(idx);
  //         } else {
  //           gsap.to(Item, {
  //             height: ServiceChildHeights[idx].total,
  //           });
  //           gsap.to(Item.querySelector(".drop-down"), {
  //             rotate: 180,
  //           });
  //           ExpandService(idx);
  //         }
  //       });
  //     });
  //     ListenerAdded = true;
  //   }

  //   function ExpandService(idx) {
  //     gsap.to(ServiceCon, {
  //       height:
  //         ServiceCon.getBoundingClientRect().height +
  //         ServiceChildHeights[idx].items,
  //     });
  //   }

  //   function CompressService(idx) {
  //     gsap.to(ServiceCon, {
  //       height:
  //         ServiceCon.getBoundingClientRect().height -
  //         ServiceChildHeights[idx].items,
  //     });
  //   }

  //   function OpenService() {
  //     ServiceChildHeights = [];
  //     ServiceItems.forEach((Item) => {
  //       const Child = Item.querySelector(".item-data");
  //       const ItemRect =
  //         Item.querySelector(".item-content").getBoundingClientRect();
  //       const ChildRect = Child.getBoundingClientRect();
  //       const ItemObj = {
  //         closed: ItemRect.height,
  //         total: ItemRect.height + ChildRect.height,
  //         items: ChildRect.height,
  //       };
  //       ServiceChildHeights.push(ItemObj);
  //     });
  //     ContainerHeight += ServiceChildHeights.reduce(
  //       (Prev, Item) => Prev + Item.closed,
  //       0
  //     );
  //     gsap.to(ServiceContent.querySelector(".drop-down"), {
  //       rotate: 180,
  //     });
  //     gsap.to(ServiceCon, {
  //       height: ContainerHeight,
  //     });
  //     if (!ListenerAdded) {
  //       AddLister();
  //     } else {
  //     }
  //   }

  //   ServiceContent.addEventListener("click", (e) => {
  //     const IsClosed = ServiceCon.getAttribute("closed") == "true";
  //     ServiceCon.setAttribute("closed", !IsClosed);
  //     if (IsClosed) {
  //       OpenService();
  //     } else {
  //       CloseServices();
  //     }
  //   });
});
