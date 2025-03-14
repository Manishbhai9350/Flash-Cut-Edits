import { Works } from "./data.js";
console.clear();
gsap.registerPlugin(ScrollTrigger, SplitType);

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
  CloseServices();
  CloseGraphics();
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


const PageRedirectors = document.querySelectorAll('.page-redirect')

PageRedirectors.forEach(Redirector => {
  const Type = Redirector.getAttribute('type')
  const SubType = Redirector.getAttribute('sub-type')
  Redirector.addEventListener('click',() => {
    console.log(Type,SubType)
    localStorage.setItem('work_data',JSON.stringify({
      Type,
      SubType
    }))
    const Link = document.createElement('a')
    Link.setAttribute('href','/work.html')
    Link.click()
  })
})


window.addEventListener('scroll',() => {
  if(IsMobileNavOpen) {
    CloseNav()
  }
})

const GraphicDesignCon = document.querySelector(".mobile-nav .item.graphic");
const GraphicContent = GraphicDesignCon.querySelector(".item-content");
const GraphicData = GraphicDesignCon.querySelector(".item-data");

const DataHeight = 96;
const ContentHeight = 50;

function CloseGraphics() {
  GraphicDesignCon.setAttribute("closed", "true");
  gsap.to(GraphicDesignCon.querySelector(".drop-down"), {
    rotate: 0,
  });
  gsap.to(GraphicDesignCon, {
    height: ContentHeight,
  });
}

GraphicContent.addEventListener("click", (e) => {
  const IsClosed = GraphicDesignCon.getAttribute("closed") == "true";
  GraphicDesignCon.setAttribute("closed", !IsClosed);
  if (IsClosed) {
    gsap.to(GraphicDesignCon.querySelector(".drop-down"), {
      rotate: 180,
    });
    gsap.to(GraphicDesignCon, {
      height: ContentHeight + DataHeight,
    });
  } else {
    CloseGraphics();
  }
});

const ServiceCon = document.querySelector(".item.services");
const ServiceContent = ServiceCon.querySelector(".item-content");
const ServiceItemsCon = ServiceCon.querySelector(".item-data");
const ServiceItems = ServiceItemsCon.querySelectorAll(".item");

let ServiceHeight = 52;
let ServiceContentHeight = 56;
let ListenerAdded = false;
let ServiceChildHeights = [];
let ContainerHeight = ServiceContentHeight;
let MaxHeight = 0;
function CloseServices() {
  ServiceItems.forEach((Item) => {
    gsap.to(Item, {
      height: ServiceHeight,
    });
    gsap.to(Item.querySelector(".drop-down"), {
      rotate: 0,
    });
    Item.setAttribute("closed", "true");
  });
  ContainerHeight = ServiceContentHeight;
  ServiceCon.setAttribute("closed", "true");
  gsap.to(ServiceContent.querySelector(".drop-down"), {
    rotate: 0,
  });
  gsap.to(ServiceCon, {
    height: ContainerHeight,
  });
}

function AddLister() {
  ServiceItems.forEach((Item, idx) => {
    const ItemContent = Item.querySelector(".item-content");
    const Child = Item.querySelector(".item-data");
    ItemContent.addEventListener("click", () => {
      let IsClosed = Item.getAttribute("closed") == "true";
      Item.setAttribute("closed", !IsClosed);
      if (!IsClosed) {
        gsap.to(Item, {
          height: ServiceChildHeights[idx].closed,
        });
        gsap.to(Item.querySelector(".drop-down"), {
          rotate: 0,
        });
        CompressService(idx);
      } else {
        gsap.to(Item, {
          height: ServiceChildHeights[idx].total,
        });
        gsap.to(Item.querySelector(".drop-down"), {
          rotate: 180,
        });
        ExpandService(idx);
      }
    });
  });
  ListenerAdded = true;
}

function ExpandService(idx) {
  gsap.to(ServiceCon, {
    height:
      ServiceCon.getBoundingClientRect().height +
      ServiceChildHeights[idx].items,
  });
}

function CompressService(idx) {
  gsap.to(ServiceCon, {
    height:
      ServiceCon.getBoundingClientRect().height -
      ServiceChildHeights[idx].items,
  });
}

function OpenService() {
  ServiceChildHeights = [];
  ServiceItems.forEach((Item) => {
    const Child = Item.querySelector(".item-data");
    const ItemRect =
      Item.querySelector(".item-content").getBoundingClientRect();
    const ChildRect = Child.getBoundingClientRect();
    const ItemObj = {
      closed: ItemRect.height,
      total: ItemRect.height + ChildRect.height,
      items: ChildRect.height,
    };
    ServiceChildHeights.push(ItemObj);
  });
  ContainerHeight += ServiceChildHeights.reduce(
    (Prev, Item) => Prev + Item.closed,
    0
  );
  gsap.to(ServiceContent.querySelector(".drop-down"), {
    rotate: 180,
  });
  gsap.to(ServiceCon, {
    height: ContainerHeight,
  });
  if (!ListenerAdded) {
    AddLister();
  } else {
  }
}

ServiceContent.addEventListener("click", (e) => {
  const IsClosed = ServiceCon.getAttribute("closed") == "true";
  ServiceCon.setAttribute("closed", !IsClosed);
  if (IsClosed) {
    OpenService();
  } else {
    CloseServices();
  }
});
