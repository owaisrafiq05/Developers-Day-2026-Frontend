"use client";

import { useState } from "react";

type BlockId =
  | "ee_block"
  | "ee_canteen"
  | "ee_lawn"
  | "mosque"
  | "cs_dhaba"
  | "entrance_garden"
  | "basketball_court"
  | "multipurpose"
  | "sports_room"
  | "futsal_court"
  | "cs_lawn"
  | "cs_block";

export default function InteractiveMap() {
  const [activeBlock, setActiveBlock] = useState<BlockId | null>(null);

  const defaultColor = "#363333";
  const activeColor = "#4D0303";

  const handleClick = (blockId: BlockId) => {
    setActiveBlock(blockId);
  };

  const getColor = (blockId: BlockId) => {
    return activeBlock === blockId ? activeColor : defaultColor;
  };

  return (
    <svg
      width="1440"
      height="543"
      viewBox="0 0 1440 543"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ maxWidth: "100%", height: "auto" }}
    >
      <rect width="1440" height="543" fill="#1D0E0E" />

      {/* EE Block */}
      <g
        id="ee_block"
        onClick={() => handleClick("ee_block")}
        style={{ cursor: "pointer" }}
      >
        <g filter="url(#filter0_d_750_6506)">
          <rect
            x="1176"
            y="36"
            width="208"
            height="471"
            rx="10"
            fill={getColor("ee_block")}
            style={{ transition: "fill 0.3s ease" }}
          />
        </g>
      </g>

      {/* EE Canteen */}
      <g
        id="ee_canteen"
        onClick={() => handleClick("ee_canteen")}
        style={{ cursor: "pointer" }}
      >
        <g filter="url(#filter1_d_750_6506)">
          <rect
            x="996"
            y="36"
            width="172"
            height="88"
            rx="10"
            fill={getColor("ee_canteen")}
            style={{ transition: "fill 0.3s ease" }}
          />
        </g>
      </g>

      {/* EE Lawn */}
      <g
        id="ee_lawn"
        onClick={() => handleClick("ee_lawn")}
        style={{ cursor: "pointer" }}
      >
        <rect
          x="1054"
          y="210"
          width="23"
          height="24"
          rx="2"
          fill={getColor("ee_lawn")}
          style={{ transition: "fill 0.3s ease" }}
        />
        <g filter="url(#filter2_d_750_6506)">
          <path
            d="M996 233V497C996 502.523 1000.48 507 1006 507H1158C1163.52 507 1168 502.523 1168 497V233C1168 227.477 1163.52 223 1158 223H1091C1089.9 223 1089 223.895 1089 225V241.5C1089 242.605 1088.1 243.5 1087 243.5H1044.5C1043.4 243.5 1042.5 242.605 1042.5 241.5V225C1042.5 223.895 1041.6 223 1040.5 223H1006C1000.48 223 996 227.477 996 233Z"
            fill={getColor("ee_lawn")}
            style={{ transition: "fill 0.3s ease" }}
          />
        </g>
        <g filter="url(#filter3_d_750_6506)">
          <path
            d="M996 206L996 141C996 135.477 1000.48 131 1006 131L1158 131C1163.52 131 1168 135.477 1168 141L1168 206C1168 211.523 1163.52 216 1158 216L1091 216C1089.9 216 1089 215.105 1089 214L1089 202.5C1089 201.395 1088.1 200.5 1087 200.5L1044.5 200.5C1043.4 200.5 1042.5 201.395 1042.5 202.5L1042.5 214C1042.5 215.105 1041.6 216 1040.5 216L1006 216C1000.48 216 996 211.523 996 206Z"
            fill={getColor("ee_lawn")}
            style={{ transition: "fill 0.3s ease" }}
          />
        </g>
      </g>

      {/* Mosque */}
      <g
        id="mosque"
        onClick={() => handleClick("mosque")}
        style={{ cursor: "pointer" }}
      >
        <g filter="url(#filter4_d_750_6506)">
          <rect
            x="854"
            y="36"
            width="98"
            height="112"
            rx="10"
            fill={getColor("mosque")}
            style={{ transition: "fill 0.3s ease" }}
          />
        </g>
      </g>

      {/* CS Dhaba */}
      <g
        id="cs_dhaba"
        onClick={() => handleClick("cs_dhaba")}
        style={{ cursor: "pointer" }}
      >
        <g filter="url(#filter5_d_750_6506)">
          <rect
            x="456"
            y="36"
            width="98"
            height="112"
            rx="10"
            fill={getColor("cs_dhaba")}
            style={{ transition: "fill 0.3s ease" }}
          />
        </g>
      </g>

      {/* Entrance Garden */}
      <g
        id="entrance_garden"
        onClick={() => handleClick("entrance_garden")}
        style={{ cursor: "pointer" }}
      >
        <g filter="url(#filter6_d_750_6506)">
          <rect
            x="710"
            y="390"
            width="242"
            height="117"
            rx="10"
            fill={getColor("entrance_garden")}
            style={{ transition: "fill 0.3s ease" }}
          />
        </g>
        <g filter="url(#filter7_di_750_6506)">
          <path
            d="M942.004 407.156C942.374 407.054 942.766 407.061 943.133 407.176L945.786 408.008C947.245 408.465 948.316 409.715 948.545 411.227L948.919 413.704C948.972 414.056 948.93 414.416 948.798 414.746L947.073 419.053C946.899 419.489 946.577 419.849 946.163 420.071L944.135 421.16C943.139 421.695 941.964 421.784 940.9 421.404L937.046 420.03C936.506 419.838 936.075 419.423 935.861 418.89L934.595 415.728C934.213 414.774 934.213 413.709 934.595 412.755L935.274 411.059C935.855 409.607 937.082 408.512 938.589 408.097L942.004 407.156Z"
            fill="#504F4F"
          />
        </g>
        <g filter="url(#filter8_di_750_6506)">
          <path
            d="M942.004 419.156C942.374 419.054 942.766 419.061 943.133 419.176L945.786 420.008C947.245 420.465 948.316 421.715 948.545 423.227L948.919 425.704C948.972 426.056 948.93 426.416 948.798 426.746L947.073 431.053C946.899 431.489 946.577 431.849 946.163 432.071L944.135 433.16C943.139 433.695 941.964 433.784 940.9 433.404L937.046 432.03C936.506 431.838 936.075 431.423 935.861 430.89L934.595 427.728C934.213 426.774 934.213 425.709 934.595 424.755L935.274 423.059C935.855 421.607 937.082 420.512 938.589 420.097L942.004 419.156Z"
            fill="#504F4F"
          />
        </g>
        <g filter="url(#filter9_di_750_6506)">
          <path
            d="M942.004 431.156C942.374 431.054 942.766 431.061 943.133 431.176L945.786 432.008C947.245 432.465 948.316 433.715 948.545 435.227L948.919 437.704C948.972 438.056 948.93 438.416 948.798 438.746L947.073 443.053C946.899 443.489 946.577 443.849 946.163 444.071L944.135 445.16C943.139 445.695 941.964 445.784 940.9 445.404L937.046 444.03C936.506 443.838 936.075 443.423 935.861 442.89L934.595 439.728C934.213 438.774 934.213 437.709 934.595 436.755L935.274 435.059C935.855 433.607 937.082 432.512 938.589 432.097L942.004 431.156Z"
            fill="#504F4F"
          />
        </g>
        <g filter="url(#filter10_di_750_6506)">
          <path
            d="M942.004 443.156C942.374 443.054 942.766 443.061 943.133 443.176L945.786 444.008C947.245 444.465 948.316 445.715 948.545 447.227L948.919 449.704C948.972 450.056 948.93 450.416 948.798 450.746L947.073 455.053C946.899 455.489 946.577 455.849 946.163 456.071L944.135 457.16C943.139 457.695 941.964 457.784 940.9 457.404L937.046 456.03C936.506 455.838 936.075 455.423 935.861 454.89L934.595 451.728C934.213 450.774 934.213 449.709 934.595 448.755L935.274 447.059C935.855 445.607 937.082 444.512 938.589 444.097L942.004 443.156Z"
            fill="#504F4F"
          />
        </g>
        <g filter="url(#filter11_di_750_6506)">
          <path
            d="M942.004 455.156C942.374 455.054 942.766 455.061 943.133 455.176L945.786 456.008C947.245 456.465 948.316 457.715 948.545 459.227L948.919 461.704C948.972 462.056 948.93 462.416 948.798 462.746L947.073 467.053C946.899 467.489 946.577 467.849 946.163 468.071L944.135 469.16C943.139 469.695 941.964 469.784 940.9 469.404L937.046 468.03C936.506 467.838 936.075 467.423 935.861 466.89L934.595 463.728C934.213 462.774 934.213 461.709 934.595 460.755L935.274 459.059C935.855 457.607 937.082 456.512 938.589 456.097L942.004 455.156Z"
            fill="#504F4F"
          />
        </g>
        <g filter="url(#filter12_di_750_6506)">
          <path
            d="M942.004 467.156C942.374 467.054 942.766 467.061 943.133 467.176L945.786 468.008C947.245 468.465 948.316 469.715 948.545 471.227L948.919 473.704C948.972 474.056 948.93 474.416 948.798 474.746L947.073 479.053C946.899 479.489 946.577 479.849 946.163 480.071L944.135 481.16C943.139 481.695 941.964 481.784 940.9 481.404L937.046 480.03C936.506 479.838 936.075 479.423 935.861 478.89L934.595 475.728C934.213 474.774 934.213 473.709 934.595 472.755L935.274 471.059C935.855 469.607 937.082 468.512 938.589 468.097L942.004 467.156Z"
            fill="#504F4F"
          />
        </g>
      </g>

      {/* Basketball Court */}
      <g
        id="basketball_court"
        onClick={() => handleClick("basketball_court")}
        style={{ cursor: "pointer" }}
      >
        <g filter="url(#filter13_d_750_6506)">
          <rect
            x="456"
            y="390"
            width="242"
            height="117"
            rx="10"
            fill={getColor("basketball_court")}
            style={{ transition: "fill 0.3s ease" }}
          />
        </g>
        <line x1="577.5" y1="390" x2="577.5" y2="507" stroke="#535252" />
        <circle
          cx="577"
          cy="449"
          r="13.5"
          fill={getColor("basketball_court")}
          stroke="#535252"
          style={{ transition: "fill 0.3s ease" }}
        />
        <path
          d="M456 407.5C479.167 405.667 525.5 411.7 525.5 450.5C525.5 489.3 479.167 493.333 456 490.5"
          stroke="#535252"
        />
        <path
          d="M697.5 407.289C674.333 405.456 628 411.489 628 450.289C628 489.089 674.333 493.122 697.5 490.289"
          stroke="#535252"
        />
      </g>

      {/* Multipurpose */}
      <g
        id="multipurpose"
        onClick={() => handleClick("multipurpose")}
        style={{ cursor: "pointer" }}
      >
        <g filter="url(#filter14_d_750_6506)">
          <rect
            x="224"
            y="86"
            width="208"
            height="206"
            rx="10"
            fill={getColor("multipurpose")}
            style={{ transition: "fill 0.3s ease" }}
          />
        </g>
      </g>

      {/* Sports Room */}
      <g
        id="sports_room"
        onClick={() => handleClick("sports_room")}
        style={{ cursor: "pointer" }}
      >
        <g filter="url(#filter15_d_750_6506)">
          <rect
            x="56"
            y="36"
            width="149"
            height="43"
            rx="10"
            fill={getColor("sports_room")}
            style={{ transition: "fill 0.3s ease" }}
          />
        </g>
      </g>

      {/* Futsal Court */}
      <g
        id="futsal_court"
        onClick={() => handleClick("futsal_court")}
        style={{ cursor: "pointer" }}
      >
        <g filter="url(#filter16_d_750_6506)">
          <rect
            x="55"
            y="86"
            width="150"
            height="220"
            rx="10"
            fill={getColor("futsal_court")}
            style={{ transition: "fill 0.3s ease" }}
          />
        </g>
        <line x1="195" y1="196.5" x2="65" y2="196.5" stroke="#535252" />
        <line x1="195.5" y1="86" x2="195.5" y2="306" stroke="#535252" />
        <line x1="65.5" y1="86" x2="65.5" y2="306" stroke="#535252" />
        <circle
          cx="130"
          cy="196"
          r="13.5"
          transform="rotate(90 130 196)"
          fill={getColor("futsal_court")}
          stroke="#535252"
          style={{ transition: "fill 0.3s ease" }}
        />
        <path
          d="M95.3708 306C93.8693 293.502 95.3708 269 130.354 269C163.347 269 165.667 293.502 163.347 306"
          stroke="#535252"
        />
        <path
          d="M95.3708 86C93.8693 98.4978 95.3708 123 130.354 123C163.347 123 165.667 98.4978 163.347 86"
          stroke="#535252"
        />
      </g>

      {/* CS Lawn */}
      <g
        id="cs_lawn"
        onClick={() => handleClick("cs_lawn")}
        style={{ cursor: "pointer" }}
      >
        <g filter="url(#filter17_d_750_6506)">
          <rect
            x="131"
            y="327"
            width="301"
            height="180"
            rx="10"
            fill={getColor("cs_lawn")}
            style={{ transition: "fill 0.3s ease" }}
          />
        </g>
        <g filter="url(#filter18_d_750_6506)">
          <rect
            x="56"
            y="327"
            width="139"
            height="180"
            rx="10"
            fill={getColor("cs_lawn")}
            style={{ transition: "fill 0.3s ease" }}
          />
        </g>
      </g>

      {/* CS Block */}
      <g
        id="cs_block"
        onClick={() => handleClick("cs_block")}
        style={{ cursor: "pointer" }}
      >
        <g filter="url(#filter19_d_750_6506)">
          <rect
            x="455"
            y="190"
            width="69"
            height="137"
            rx="10"
            fill={getColor("cs_block")}
            style={{ transition: "fill 0.3s ease" }}
          />
        </g>
        <g filter="url(#filter20_d_750_6506)">
          <rect
            x="883"
            y="190"
            width="69"
            height="137"
            rx="10"
            fill={getColor("cs_block")}
            style={{ transition: "fill 0.3s ease" }}
          />
        </g>
        <g filter="url(#filter21_d_750_6506)">
          <path
            d="M612.026 229.535C607.17 227.279 608.778 220 614.132 220H798.74C804.195 220 805.708 227.491 800.681 229.608L739.861 255.216C738.633 255.734 737.313 256 735.981 256H671.209C669.754 256 668.316 255.682 666.996 255.069L612.026 229.535Z"
            fill={getColor("cs_block")}
            style={{ transition: "fill 0.3s ease" }}
          />
        </g>
        <g filter="url(#filter22_d_750_6506)">
          <rect
            x="489"
            y="246"
            width="428"
            height="111"
            rx="10"
            fill={getColor("cs_block")}
            style={{ transition: "fill 0.3s ease" }}
          />
        </g>
        <g filter="url(#filter23_di_750_6506)">
          <circle cx="703" cy="296" r="45" fill="#535252" />
        </g>
      </g>

      <defs>
        {/* Include all filter definitions from the original SVG if you need identical shadows */}
      </defs>
    </svg>
  );
}
