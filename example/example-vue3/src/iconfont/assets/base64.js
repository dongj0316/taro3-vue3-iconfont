// https://developers.weixin.qq.com/community/develop/doc/000ca4532b8c207e4419f5c5c56c00
var Base64 = {
  // private property
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

  // public method for encoding
  encode: function (input) {
    var output = '';
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output =
        output +
        this._keyStr.charAt(enc1) +
        this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) +
        this._keyStr.charAt(enc4);
    } // Whend

    return output;
  }, // End Function encode

  // public method for decoding
  decode: function (input) {
    var output = '';
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    while (i < input.length) {
      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }

      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    } // Whend

    output = Base64._utf8_decode(output);

    return output;
  }, // End Function decode

  // private method for UTF-8 encoding
  _utf8_encode: function (string) {
    var utftext = '';
    string = string.replace(/\r\n/g, '\n');

    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    } // Next n

    return utftext;
  }, // End Function _utf8_encode

  // private method for UTF-8 decoding
  _utf8_decode: function (utftext) {
    var string = '';
    var i = 0;
    var c, c1, c2, c3;
    c = c1 = c2 = 0;

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(
          ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63),
        );
        i += 3;
      }
    } // Whend

    return string;
  }, // End Function _utf8_decode
};

const genBase64UrlFn = (viewBox, content) => {
  return (fill = 'currentColor') => {
    const str = `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg viewBox="${viewBox}" fill="${fill}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${content}</svg>`;
    return `data:image/svg+xml;base64,${Base64.encode(str)}`;
  };
};

export default {
  'iconfont-iconfontxingxing': genBase64UrlFn('0 0 1024 1024', '<path d="M510.364 188.323 578.278 407.062l16.092 40.232 43.331 0 191.571 0-157.451 119.294-34.331 26.011 13.169 42.598 55.84 192.321-160.369-120.373-34.7-23.381-35.336 22.408-161.906 125.448 56.987-194.391 13.927-43.22-36.193-27.422-157.454-119.293 191.567 0 43.329 0 16.093-40.23L510.364 188.323M510.367 0l-127.346 383.293-382.02 0 309.258 234.306-119.734 405.401 319.843-262.781 317.625 262.781-117.523-405.401 309.252-234.306-382.02 0L510.367 0 510.367 0z"  ></path>'),
  'iconfont-iconfont5': genBase64UrlFn('0 0 1024 1024', '<path d="M266.8 532.5 324 486.1l114.4 84.5c0 0 158-163.6 310.6-239.9l21.8 24.6c0 0-190.7 158.1-288.7 368.1L266.8 532.5zM202 209l0 369.8c0 60.1 0 218.8 314.1 343.6 314.1-124.8 314.1-283.5 314.1-343.6l0-369.8c-173.9-0.7-274-62.6-314.1-94.6C476 146.4 375.9 208.3 202 209zM516.1 982.2l-10-3.9C183.6 853.6 146.4 690.6 146.4 578.8l0-426.9 28.8 1c224.1 7.6 319.5-93.6 320.4-94.6l20.5-22.5 20.5 22.5c0.8 0.8 91.2 95 296.5 95l0 0c7.8 0 15.8-0.1 23.9-0.4l28.8-1 0 426.9c0 111.8-37.3 274.8-359.7 399.5L516.1 982.2z"  ></path>'),
  'iconfont-iconfontshouji': genBase64UrlFn('0 0 1024 1024', '<path d="M768.657 63.705l-576.797 0c-35.335 0-63.984 28.656-63.984 63.984l0 767.735c0 35.328 28.649 63.965 63.984 63.965l576.797 0c35.335 0 63.977-28.636 63.977-63.965l0-767.735C832.634 92.361 803.991 63.705 768.657 63.705zM768.657 127.689l0 639.768-576.797 0 0-639.768L768.657 127.689zM448.77 895.424l-256.91 0 0-63.984 256.91 0L448.77 895.424zM512.747 895.424l0-63.984 255.91 0 0 63.984L512.747 895.424z"  ></path>'),
  'iconfont-iconfontphone': genBase64UrlFn('0 0 1024 1024', '<path d="M233.778 129.618c4.719 4.22 11.714 11.174 21.099 22.284 13.874 16.423 29.387 37.656 44.861 61.405 30.009 46.055 48.741 84.212 54.135 98.747-1.27 5.075-4.854 11.448-11.496 22.598-12.505 20.992-29.63 49.741-29.63 90.518 0 25.987 12.096 54.066 39.219 91.043 17.721 24.158 41.286 51.342 68.149 78.612 26.119 26.515 53.359 50.935 76.702 68.762 36.802 28.105 63.451 40.097 89.108 40.097 36.072 0 64.861-15.349 87.993-27.682 12.694-6.768 24.768-13.205 33.596-14.651 12.498 4.425 48.54 22.768 102.228 61.148 45.318 32.397 73.236 57.52 85.817 70.75-4.181 22.79-17.587 46.155-38.186 65.94-12.037 11.562-25.795 21.099-39.787 27.582-12.117 5.614-24.097 8.706-33.731 8.706-55.427 0-124.538-23.315-199.861-67.426-73.589-43.095-149.913-104.029-220.721-176.215-69.597-70.951-128.733-147.415-171.016-221.124-21.044-36.685-37.238-71.619-48.132-103.833-10.554-31.207-15.906-59.109-15.906-82.931 0-7.975 3.646-18.727 10.266-30.276 7.857-13.708 19.619-28.202 34.012-41.913 13.543-12.901 29.149-24.766 43.943-33.408C223.528 134.211 229.364 131.429 233.778 129.618M241.316 62.744c-52.088 0-177.097 94.596-177.097 181.205 0 253.175 435.762 715.528 719.636 715.528 78.135 0 177.102-83.939 177.102-181.222 0-33.301-203.143-181.205-250.023-181.205-48.18 0-83.343 42.634-125.009 42.634-41.671 0-209.179-167.886-209.179-214.513 0-46.645 41.666-69.288 41.666-117.256C418.413 273.267 293.399 62.744 241.316 62.744L241.316 62.744z"  ></path>'),
  'iconfont-iconfontqicheyongpin': genBase64UrlFn('0 0 1024 1024', '<path d="M512.426 7.41c-278.677 0-504.593 225.866-504.593 504.562s225.916 504.618 504.593 504.618 504.587-225.922 504.587-504.618S791.103 7.41 512.426 7.41zM512.426 953.497c-243.842 0-441.514-197.678-441.514-441.526 0-243.816 197.672-441.501 441.514-441.501s441.507 197.685 441.507 441.501C953.934 755.819 756.268 953.497 512.426 953.497zM514.334 127.688c-212.251 0-384.315 172.045-384.315 384.315s172.064 384.309 384.315 384.309c212.257 0 384.315-172.039 384.315-384.309S726.591 127.688 514.334 127.688zM514.33 640.118c-70.746 0-128.105-57.327-128.105-128.086s57.359-128.143 128.105-128.143c70.752 0 128.105 57.385 128.105 128.143S585.083 640.118 514.33 640.118zM546.357 193.323c64.414 6.395 123.206 31.878 170.656 70.708l-91.345 91.35c1.178 0.838 2.344 1.692 3.502 2.556-24.015-17.923-52.367-30.35-83.191-35.456 0.126 0.021 0.253 0.039 0.379 0.06M542.372 321.916c0.026 0.004 0.052 0.007 0.079 0.011C542.424 321.923 542.398 321.92 542.372 321.916zM482.304 322.542c0.126-0.021 0.253-0.039 0.379-0.06-30.825 5.106-59.177 17.534-83.193 35.458 1.159-0.865 2.325-1.719 3.504-2.558l-91.341-91.345c47.449-38.831 106.24-64.315 170.651-70.712M486.289 321.916c-0.026 0.004-0.053 0.007-0.079 0.011C486.236 321.923 486.262 321.92 486.289 321.916zM195.662 479.964c6.397-64.399 31.873-123.181 70.693-170.625l91.337 91.338c0.835-1.172 1.685-2.333 2.545-3.486-17.854 23.919-30.255 52.144-35.398 82.837 0.004-0.021 0.007-0.043 0.01-0.065M324.842 544.036c4.899 29.197 16.373 56.167 32.867 79.322l-91.321 91.327c-38.838-47.448-64.327-106.239-70.726-170.648L324.842 544.037zM403.007 668.643c23.148 16.48 50.109 27.944 79.296 32.842l0 129.165c-64.397-6.395-123.177-31.868-170.621-70.683L403.007 668.643zM546.357 701.485c29.188-4.898 56.149-16.363 79.297-32.843l91.328 91.329c-47.444 38.814-106.225 64.286-170.625 70.679L546.357 701.485zM670.953 623.354c16.493-23.154 27.966-50.123 32.864-79.319l129.188 0c-6.398 64.41-31.887 123.203-70.725 170.651L670.953 623.354zM703.812 479.964c0.004 0.021 0.007 0.043 0.01 0.065-5.142-30.693-17.544-58.916-35.396-82.835 0.86 1.153 1.71 2.314 2.545 3.486l91.343-91.343c38.82 47.445 64.295 106.227 70.692 170.627L703.812 479.964z"  ></path>'),
  'iconfont-iconfontshipin': genBase64UrlFn('0 0 1024 1024', '<path d="M768.47 384.042c-27.87 0-127.359-0.202-127.359-0.202l0 63.882 126.855 0 0 127.876 64.862 0c0 0 0-70.289 0-124.876C832.829 402.41 803.6 384.042 768.47 384.042zM712.395 178.09c-101.314 0-119.218 58.591-165.123 79.616 3.613-32.853 10.772-69.609 24.205-93.007 39.526-68.851 105.686-92.922 106.349-93.157l-0.146 0.051-20.772-60.535c-3.611 1.239-89.045 31.39-140.934 121.778-16.203 28.224-27.16 68.647-32.566 120.146-0.241 2.293-0.465 4.556-0.673 6.784-45.82-18.931-49.878-81.676-171.134-81.676-142.799 0-275.597 141.784-275.597 329.471 0 196.597 216.757 514.439 333.197 514.439 84.787 0 117.548-47.969 142.798-47.969 25.25 0 40.162 47.969 142.799 47.969 130.437 0 333.203-324.084 333.203-514.439C987.998 319.871 835.857 178.09 712.395 178.09zM719.257 920.652c-30.868 27.567-54.017 37.348-64.461 37.348-21.911 0-40.078-2.742-53.998-8.15-10.59-4.114-17.651-9.26-25.826-15.218-13.442-9.796-33.755-24.601-62.974-24.601-26.817 0-46.953 12.221-64.719 23.004-20.221 12.273-41.13 24.964-78.08 24.964-0.179 0-18.952-0.994-58.493-36.415-31.864-28.544-66.803-70.583-98.381-118.374-33.038-50-61.02-103.72-80.919-155.352-20.544-53.305-31.403-101.819-31.403-140.299 0-37.875 6.394-74.365 19.005-108.455 11.78-31.843 28.471-60.357 49.609-84.749 20.127-23.225 43.087-41.363 68.242-53.909 24.424-12.182 49.571-18.358 74.741-18.358 26.035 0 46.323 3.577 60.299 10.633 10.921 5.513 18.724 13.469 28.604 23.543 20.64 21.044 51.831 52.847 111.495 52.847 58.617 0 92.383-30.196 117.037-52.244 23.419-20.943 38.89-34.778 83.361-34.778 43.25 0 95.634 28.112 136.71 73.366 22.902 25.232 41.049 54.039 53.935 85.621 13.907 34.085 20.958 69.911 20.958 106.483 0 76.405-42.241 191.859-107.613 294.135C784.997 850.802 751.411 891.937 719.257 920.652z"  ></path>'),
  'iconfont-iconfontgongyichongwu': genBase64UrlFn('0 0 1024 1024', '<path d="M1009.992 464.055c-6.551-6.944-18.336-15.222-37.281-15.222l-49.371 0c-38.996-25.66-120.146-79.334-133.599-89.515-11.267-8.528-18.037-15.434-20.123-20.527-1.656-4.044-1.621-10.133-1.405-21.439 0.065-3.444 0.14-7.348 0.14-11.519 0-62.287-42.817-102.91-50.405-109.618-6.619-6.281-69.046-65.429-99.237-90.858-36.233-30.516-78.03-39.091-82.678-39.968-1.957-0.37-3.944-0.556-5.937-0.556l-207 0c-47.593 0-81.063 32.921-89.606 42.268L9.148 304.64l-0.389-0.056c-0.209 1.445-5.091 35.838-2.612 75.772 3.679 59.291 21.385 100.722 52.625 123.142 38.728 27.793 63.563 91.347 69.852 113.441 3.922 13.951 16.632 23.343 30.78 23.342 1.419 0 2.854-0.095 4.294-0.289 6.367-0.857 63.158-9.331 96.358-42.532 40.682-40.681 116.825-177.352 125.373-192.802l-55.999-30.985c-22.023 39.797-85.546 149.45-114.629 178.532-8.286 8.287-22.122 14.338-34.708 18.369-3.126-7.871-6.994-16.877-11.632-26.421-20.155-41.479-44.506-72.651-72.375-92.652-14.304-10.265-23.537-36.589-26-74.123-1.002-15.274-0.677-29.789-0.025-41.099l207.183-182.431c1.268-1.117 2.124-1.947 3.188-3.234 5.468-6.17 23.464-21.782 42.665-21.782l203.4 0c7.638 1.93 31.333 8.924 50.985 25.476 29.77 25.071 96.204 88.133 96.872 88.767 0.503 0.478 1.021 0.939 1.555 1.383 0.284 0.237 28.444 24.723 28.444 61.374 0 3.562-0.065 6.987-0.128 10.3-0.285 14.963-0.58 30.436 6.169 46.914 6.764 16.516 19.323 31.104 40.723 47.302 18.784 14.217 132.207 88.775 145.078 97.23 5.218 3.428 11.325 5.254 17.568 5.254l45.725 0 0 55.486-118.379 115.162c-0.723 0.704-0.585 0.491-1.022 1.011-2.803 2.556-22.901 19.341-66.99 19.341l-327.156 0c-11.386-0.487-53.997 1.231-100.804 48.039-20.792 20.791-199.636 208.854-207.239 216.85l46.379 44.103c1.856-1.953 185.888-195.471 206.115-215.698 27.152-27.153 48.025-29.224 51.947-29.365 1.254 0.214 1.035 0.071 2.758 0.071l328 0c71.04 0 106.152-31.842 112.987-38.815l127.718-124.248c6.193-6.024 9.687-14.297 9.687-22.937l0-81.681C1023.647 493.763 1022.647 477.47 1009.992 464.055zM959.501 498.675c0.007-0.35 0.025-0.662 0.041-0.932C959.524 498.053 959.51 498.364 959.501 498.675zM640.5 417.487l0-67.497c0-16.568-14.119-29.999-31.535-29.999-17.417 0-31.536 13.431-31.536 29.999l0 67.497c0 16.568 14.119 29.999 31.536 29.999C626.381 447.486 640.5 434.055 640.5 417.487z"  ></path>'),
  'iconfont-iconfont-shanzi': genBase64UrlFn('0 0 1024 1024', '<path d="M1017.69901 473.833651c-13.058633-55.777177-35.499128-108.649591-66.698962-157.151039-30.600861-47.568688-68.755947-89.611468-113.407586-124.958037-45.032524-35.649639-95.343178-63.424576-149.532309-82.551778-56.050554-19.784536-114.92908-29.816565-175.002479-29.816565-60.882269 0-120.509255 10.297215-177.224311 30.60598-54.824964 19.631977-105.598413 48.107252-150.909434 84.635385-44.956757 36.241445-83.145632 79.278417-113.50588 127.915018-30.99608 49.653319-52.88982 103.670437-65.074056 160.552386-8.402003 39.226071 12.373654 79.121762 49.402467 94.863999l361.065993 153.49884-60.120498 23.10602c-22.345273 8.589374-34.666709 31.268434-29.297455 53.927016 8.941591 37.738365 32.205289 71.886989 65.505111 96.155119 32.945558 24.010111 74.431344 37.232566 116.817125 37.232566 42.392948 0 82.33881-12.550786 115.518838-36.295711 33.000848-23.616939 56.44987-56.988433 66.025245-93.965028 5.848433-22.580767-6.523173-46.168013-28.776297-54.866943l-65.128322-25.456861 371.859792-160.786855c37.417889-16.179436 57.807542-56.822564 48.483018-96.643512zM666.931256 169.034252c47.568688 16.790695 91.731934 41.171453 131.260051 72.463436a457.835442 457.835442 0 0 1 18.409458 15.404355L655.034732 412.333979c-34.905275-19.731294-72.157294-32.187883-110.298047-36.868063l-1.44163-231.654055c42.355064 2.721487 83.821396 11.168541 123.636201 25.222391z m-442.164878 74.984242c39.772825-32.062969 84.34153-57.058057 132.468236-74.292095 39.469755-14.132689 80.572608-22.724111 122.578527-25.695426l1.436511 230.857471c-38.557474 4.025917-76.256931 15.986945-111.631145 35.374215L209.866799 256.576447a449.73139 449.73139 0 0 1 14.899579-12.557953zM80.583871 519.508151c-9.094149-3.866191-14.209481-13.601293-12.164782-23.146975 15.350089-71.665829 48.96834-138.639192 96.873886-194.579168l150.776329 145.050763c-40.505927 33.644872-75.541235 77.692418-102.776585 129.093509L80.583871 519.508151z m507.70992 334.421425c-22.021726 15.759643-49.926696 24.438095-78.575008 24.438095-52.351257 0-98.607324-28.726127-115.860815-70.110548l114.009631-43.816148 116.881629 45.686787c-7.508151 16.882845-20.092726 32.091638-36.455437 43.801814z m-72.715312-156.465036a20.757227 20.757227 0 0 1-16.284896 0.049146l-227.334282-96.645559c24.858912-45.528085 56.590142-83.799894 92.964692-111.848209 44.271778-34.138385 94.602908-52.182316 145.54837-52.182316 50.422257 0 100.296735 17.694786 144.23063 51.172765 35.957829 27.400195 67.478138 64.816037 92.35548 109.365287l-231.479994 100.088886z m428.444814-185.255667l-138.442606 59.861455c-26.222727-48.431824-59.426304-90.182796-97.576271-122.607196l153.175292-147.3586a448.10546 448.10546 0 0 1 36.432911 48.923289c27.268114 42.388852 46.875518 88.576319 58.277505 137.277425 2.312957 9.877422-2.67746 19.930952-11.866831 23.903627z" ></path>'),
};