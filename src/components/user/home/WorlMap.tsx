// import { useEffect } from "react";
// import $ from "jquery";
// import "jqvmap/dist/jqvmap.min.css";
// import "jqvmap/dist/jquery.vmap.min.js"; // Ensure vectorMap is imported correctly
// import Head from "next/head";

// const WorldMap = () => {
//   useEffect(() => {
//     const MyRegions = ["CH", "NL", "CA", "DE", "SA", "MA"];
//     const MyRegionsColors = {
//       CH: "#49BC00",
//       NL: "#FA4444",
//       CA: "#4CAAE6",
//       DE: "#0CCCBA",
//       SA: "#A9FF00",
//       MA: "#C351FD",
//     };
//     const MyRegionsInfo: {
//       [key in "CH" | "NL" | "CA" | "DE" | "SA" | "MA"]: string;
//     } = {
//       CH: "<br>",
//       NL: "<br> Address: Amsterdam <br> Phone: +3197005033557",
//       CA: "<br> Address: Ontario <br> Phone: +13438000033",
//       DE: "<br>",
//       SA: "<br> Name: Al-Nawras Al-Fourati EST <br> Address: Jeddah - AL Faisaliyah Dist - Ar Rawdah <br> Phone: +966 55 535 5264",
//       MA: "<br>",
//     };

//     // Initialize vectorMap once jQuery is available
//     if ($ && $.fn.vectorMap) {
//       $("#world-map-markers").vectorMap({
//         map: "world_mill_en",
//         normalizeFunction: "polynomial",
//         hoverOpacity: 0.7,
//         zoomOnScroll: false,
//         zoomAnimate: true,
//         zoomStep: 1.4,
//         hoverColor: false,
//         markerStyle: {
//           initial: {
//             fill: "#0037B3",
//             stroke: "#383f47",
//           },
//         },
//         regionStyle: {
//           initial: {
//             fill: "#DDDDDD",
//           },
//         },
//         backgroundColor: "#ffffff",
//         series: {
//           regions: [
//             {
//               values: MyRegionsColors,
//               attribute: "fill",
//             },
//           ],
//         },
//         onRegionTipShow: function (
//           e: any,
//           el: JQuery<HTMLElement>,
//           code: string
//         ) {
//           el.css("background", "white")
//             .css("color", "#525252")
//             .css("border-radius", "0.6rem")
//             .css("border-color", "#BEBEBE")
//             .css("position", "absolute")
//             .css("z-index", "1");
//           if (MyRegions.includes(code)) {
//             // @ts-ignore
//             el.html("<ins>" + el.html() + "</ins>" + MyRegionsInfo[code]);
//           }
//         },
//       });
//     } else {
//       console.error("jQuery or vectorMap is not loaded correctly.");
//     }

//     return () => {
//       // Cleanup when the component is unmounted
//       if ($ && $.fn.vectorMap) {
//         $("#world-map-markers").vectorMap("destroy");
//       }
//     };
//   }, []);

//   return (
//     <>
//       <Head>
//         {/* Make sure to include jQuery in the head tag */}
//         <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
//       </Head>

//       <div className="reg-area World-Map Gride default-padding">
//         <div className="container">
//           <div className="row">
//             <div className="site-heading text-center">
//               <div className="col-md-8 col-md-offset-2">
//                 <h2>Regional Offices</h2>
//               </div>
//             </div>
//             <div id="world-map-markers"></div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .dropdown-active {
//           animation-name: example;
//           animation-duration: 2s;
//         }

//         @keyframes example {
//           0% {
//             background-color: rgb(29 29 29);
//             left: 200px;
//             top: 0px;
//           }
//           100% {
//             background-color: #ffb606;
//             left: 0px;
//             top: 0px;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default WorldMap;
