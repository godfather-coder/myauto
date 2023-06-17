import React from 'react'

interface type {
    method: () => void
}

const Bike : React.FC<type> = ({method}) => {
  return (
    
          <button className="vehicle-type " onClick={()=>method()}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_475_27802"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="28"
                height="28"
                style={{ maskType: "alpha" }}
              >
                <rect width="28" height="28" fill="#fd4100"></rect>
              </mask>
              <g mask="url(#mask0_475_27802)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.023 18.8527C13.0242 18.2669 12.9911 17.6068 12.8247 17.0002L12.8227 16.9929C11.9708 13.9705 9.22861 12.0964 6.20706 12.0421C6.16642 12.0414 6.04489 12.0195 5.83631 11.8625C5.63256 11.7091 5.41899 11.4817 5.21454 11.2148C5.01414 10.9532 4.84713 10.6862 4.72918 10.4815C4.67088 10.3804 4.62621 10.2972 4.59705 10.2413C4.5825 10.2134 4.57191 10.1925 4.56551 10.1797L4.55927 10.1672C4.54186 10.131 4.52229 10.0954 4.50105 10.0614C4.27359 9.69692 4.12258 9.41137 4.02537 9.19374C4.2449 9.23207 4.5118 9.2975 4.82349 9.39146C5.74001 9.66773 6.82816 10.1223 7.83944 10.552C7.90006 10.5777 7.96049 10.6034 8.0206 10.629C8.45007 10.8117 8.86353 10.9875 9.22027 11.1297C9.60259 11.2822 10.0121 11.4345 10.3351 11.4978C12.1264 11.8489 13.4167 10.9609 14.3329 10.3305C14.3513 10.3178 14.3696 10.3052 14.3877 10.2927C15.3865 9.60614 16.0192 9.20348 16.9149 9.31607C17.7669 9.42581 18.4479 9.81387 18.9901 10.1228C19.0763 10.172 19.159 10.2191 19.2384 10.2628C19.3086 10.3015 19.3937 10.3467 19.481 10.3859C19.5519 10.4177 19.7053 10.4836 19.8936 10.5099C20.0636 10.5337 20.5823 10.5622 20.9601 10.1029C21.2778 9.71655 21.2268 9.28546 21.2136 9.18293C21.1795 8.91681 21.0594 8.64463 20.9811 8.47211C20.8825 8.25504 20.7454 7.98067 20.575 7.64902C20.5463 7.59327 20.4979 7.46292 20.4623 7.26697C20.428 7.07834 20.4138 6.87281 20.425 6.68372C20.4312 6.57951 20.4443 6.4934 20.4599 6.42521C20.4926 6.4394 20.5291 6.45628 20.5694 6.47631C20.8998 6.64064 21.3157 6.92849 21.7693 7.29367C22.6115 7.97177 23.4218 8.78273 23.8085 9.16971C23.8342 9.19535 23.8579 9.21912 23.8797 9.24088L23.8848 9.246C24.1743 9.53129 24.4039 9.8902 24.5401 10.2745C24.726 10.9085 24.7052 11.2712 24.6561 11.4598C24.614 11.621 24.5358 11.7219 24.4003 11.8141C24.2388 11.9239 23.9944 12.0181 23.6532 12.0914C23.3548 12.1556 23.0533 12.1906 22.7323 12.2279C22.6854 12.2334 22.6382 12.2389 22.5904 12.2445C19.9226 12.5597 17.7623 14.2524 16.9731 16.76L16.9708 16.7675C16.7743 17.4078 16.6814 18.1658 16.6883 18.8935C16.2533 18.8999 15.7263 18.8973 15.1731 18.8903C14.6637 18.8839 14.1251 18.8736 13.6264 18.864C13.4165 18.86 13.2137 18.8561 13.023 18.8527ZM17.5699 18.8506C17.5846 18.848 17.5813 18.8476 17.5649 18.8514C17.567 18.8511 17.5699 18.8506 17.5699 18.8506ZM20.2494 6.35572L20.2524 6.35604L20.2494 6.35572ZM3.53215 9.15938L3.53383 9.159L3.53215 9.15938ZM2.60599 11.18C2.61674 11.2013 2.63029 11.2278 2.64654 11.2589C2.688 11.3384 2.74741 11.4487 2.82296 11.5799C2.9727 11.8397 3.1924 12.1928 3.46809 12.5526C3.73974 12.9072 4.09164 13.3028 4.5131 13.6201C4.92952 13.9336 5.49357 14.23 6.16753 14.2418M2.60599 11.18C2.16859 10.4732 1.86111 9.83639 1.73623 9.27388C1.60746 8.69389 1.63027 7.92383 2.26195 7.39193C2.78916 6.94801 3.46618 6.9311 3.90296 6.963C4.39488 6.99893 4.93573 7.12751 5.45843 7.28507C6.50937 7.60186 7.70805 8.10581 8.69974 8.52716C8.76135 8.55334 8.82211 8.57918 8.88199 8.60464C9.31562 8.78905 9.70338 8.95394 10.035 9.08618C10.4369 9.24638 10.6651 9.32066 10.7581 9.33888C11.5721 9.49839 12.1516 9.16025 13.1415 8.4798C13.1743 8.45725 13.2076 8.43427 13.2414 8.41094C14.1459 7.78708 15.4178 6.90979 17.1913 7.13351L17.1938 7.13382C17.5692 7.18204 17.9252 7.267 18.2545 7.37087C18.2221 7.09711 18.2131 6.81912 18.2288 6.55364C18.2672 5.90629 18.4932 4.8102 19.4925 4.32876C19.9047 4.12769 20.3237 4.13418 20.6448 4.19114C20.9692 4.2487 21.2783 4.37184 21.5489 4.50641C22.0901 4.77553 22.6504 5.17865 23.149 5.58007C24.0888 6.33679 24.9763 7.22558 25.3605 7.61036C25.3866 7.63654 25.4104 7.66038 25.4318 7.68169C25.9642 8.2072 26.3806 8.86295 26.6273 9.57841C26.6324 9.59312 26.6372 9.60794 26.6416 9.62285C26.9047 10.5058 26.9695 11.3066 26.785 12.0146C26.5927 12.7523 26.1584 13.279 25.6372 13.6334C25.142 13.9701 24.5854 14.1413 24.1155 14.2423C23.7051 14.3305 23.2901 14.3783 22.9766 14.4144C22.9317 14.4196 22.889 14.4245 22.8486 14.4293C20.9801 14.6501 19.5848 15.7952 19.0729 17.4165C18.8744 18.0666 18.8324 19.0086 18.9628 19.6945C19.0533 20.1704 18.8218 20.6495 18.3927 20.8744C18.2089 20.9707 18.025 21.0041 17.9582 21.016C17.8594 21.0338 17.7554 21.0456 17.6581 21.0543C17.4616 21.0718 17.2229 21.0822 16.9674 21.0885C16.453 21.1011 15.8031 21.0984 15.1454 21.0901C14.5789 21.083 14.0131 21.072 13.508 21.0622C12.809 21.0487 12.2263 21.0374 11.9195 21.0416C11.6251 21.0458 11.3413 20.9317 11.1317 20.725C10.9221 20.5183 10.8041 20.2362 10.8041 19.9418C10.8041 19.6831 10.8091 19.4471 10.8137 19.2281C10.8276 18.5769 10.8382 18.0774 10.7041 17.5859C10.1397 15.5901 8.31442 14.2804 6.16753 14.2418"
                  fill="#7d7f87"
                ></path>
                <path
                  d="M5.32409 15.4533C4.27136 15.6123 3.24152 16.2655 2.66366 17.1401C2.13157 17.941 1.96565 18.5317 2.0057 19.5484C2.04575 20.6786 2.3547 21.3659 3.16714 22.1781C4.72335 23.7287 7.24647 23.7173 8.80269 22.1497C9.24895 21.6953 9.55218 21.2012 9.75815 20.5878C9.88974 20.1959 9.91263 19.6189 9.91263 19.395C9.91263 19.1344 9.89547 18.5885 9.78676 18.2307C9.3691 16.9016 8.30493 15.8736 6.99473 15.5385C6.54275 15.4249 5.77608 15.3851 5.32409 15.4533ZM6.70866 17.7706C6.86314 17.8501 7.092 18.0091 7.21787 18.1341C8.36786 19.2757 7.46389 21.2296 5.8333 21.116C4.443 21.0137 3.69923 19.4234 4.52882 18.3329C4.73479 18.0659 5.1639 17.7479 5.44996 17.6627C5.76464 17.5661 6.39971 17.6229 6.70866 17.7706Z"
                  fill="#7d7f87"
                ></path>
                <path
                  d="M23.4551 15.4648C21.5285 15.7433 20.0879 17.4201 20.0879 19.3811C20.0879 21.1886 21.2941 22.7517 23.0607 23.2292C23.6438 23.3884 24.6728 23.3599 25.2445 23.178C25.9191 22.9564 26.4107 22.6551 26.891 22.172C27.3769 21.6775 27.6342 21.2796 27.8514 20.6771C27.9886 20.2962 28 19.6278 28 19.3811C28 19.1344 28 18.483 27.8228 18.0283C27.1254 16.2208 25.3646 15.1863 23.4551 15.4648ZM24.6842 17.7327C25.0959 17.8862 25.4789 18.2329 25.6733 18.6308C25.9019 19.0912 25.9019 19.671 25.6733 20.1314C25.3817 20.7282 24.8386 21.0863 24.1754 21.1318C23.4265 21.1773 22.8206 20.8192 22.4833 20.1428C21.7801 18.7274 23.1921 17.1814 24.6842 17.7327Z"
                  fill="#7d7f87"
                ></path>
              </g>
            </svg>
          </button>
  )
}

export default Bike