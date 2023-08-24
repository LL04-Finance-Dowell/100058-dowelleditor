/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useStateContext } from "../../contexts/contextProvider";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import { useSearchParams } from "react-router-dom";
import { GrEmoji } from "react-icons/gr";
import Picker from "emoji-picker-react";
import SelectAnsAndQuestion from "../selectAnsAndQuestion";
import useSelectedAnswer from '../../customHooks/useSelectedAnswers';

const ScaleRightSide = () => {
  const {
    sidebar,
    setIsLoading,
    scaleData,
    data,
    item,
    isDropped,
    companyId,
    custom1,
    setCustom1,
    custom2,
    setCustom2,
    custom3,
    setCustom3,
    customId,
    setScaleData,
    setScaleId,
    scaleId,
    setScaleTypeContent,
    scaleTypeContent,
    setConfirmRemove,
    confirmRemove,
  } = useStateContext();
  const [selectedType, setSelectedType] = useState('')
  // const [addedAns, setAddedAns] = useState([])
  const { addedAns, setAddedAns } = useSelectedAnswer()

  const [inputStr, setInputStr] = useState("");
  const [upperLimit, setUpperLimit] = useState("");
  const [space, setSpace] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [score, setScore] = useState(false);
  const [showBorder, setShowBorder] = useState(true);
  const [holdText, setHoldText] = useState("");
  const [isEmojiFormat, setIsEmojiFormat] = useState(false);

  const [percentSumInputValue, setPercentSumInputValue] = useState('');
  const [percentSumLabelTexts, setPercentSumLabelTexts] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)

  const [productCount, setProductCount] = useState(1);
  const [inputFields, setInputFields] = useState([
    <input key={0} type="text" placeholder="Product 1" required />,
  ]);



  useEffect(() => {

  }, []);

  const fontStyles = [
    "Arial",
    "Helvetica",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
    "Comic Sans MS",
    "Impact",
    "Arial Black",
  ];
  let scale = document.querySelector(".focussedd");
  let circles = scale?.querySelector(".circle_label");
  let scaleBg = scale?.querySelector(".label_hold");
  let percentSliderBg = scale?.querySelector(".percent-slider");
  // <<<<<<< HEAD
  let fontColor = scale?.querySelector(".scool_input");
  // =======
  // let fontColor = scale?.firstChild;
  const element = JSON.parse(sessionStorage.getItem("cutItem"));
  // console.log(scale);
  // console.log(fontColor.style.color);
  // >>>>>>> 3173bb44e3ed7c230aaab9775e84cdf4bd2e6ee2
  let fontFamlity = scale?.firstChild;

  // if(!scale)
  if (fontColor) {
    // Get the computed background color in RGB format
    const rgbColor = getComputedStyle(fontColor).color;

    // Extract the RGB values
    const rgbValues = rgbColor.match(/\d+/g);

    // Convert each RGB value to hexadecimal
    fontColor =
      "#" +
      rgbValues
        .map((value) => parseInt(value).toString(16).padStart(2, "0"))
        .join("");

    // console.log(fontColor);
  }
  // console.log(circles);
  if (circles) {
    // Get the computed background color in RGB format
    const rgbColor = getComputedStyle(circles).backgroundColor;

    // Extract the RGB values
    const rgbValues = rgbColor.match(/\d+/g);

    // Convert each RGB value to hexadecimal
    circles =
      "#" +
      rgbValues
        .map((value) => parseInt(value).toString(16).padStart(2, "0"))
        .join("");

    // console.log(circles);
  }

  if (scaleBg) {
    // Get the computed background color in RGB format
    const rgbColor = getComputedStyle(scaleBg).backgroundColor;

    // Extract the RGB values
    const rgbValues = rgbColor.match(/\d+/g);

    // Convert each RGB value to hexadecimal
    scaleBg =
      "#" +
      rgbValues
        .map((value) => parseInt(value).toString(16).padStart(2, "0"))
        .join("");
  }

  if (percentSliderBg) {
    // Get the computed background color in RGB format
    const rgbColor = getComputedStyle(percentSliderBg).backgroundColor;

    // Extract the RGB values
    const rgbValues = rgbColor.match(/\d+/g);

    // Convert each RGB value to hexadecimal
    percentSliderBg =
      "#" +
      rgbValues
        .map((value) => parseInt(value).toString(16).padStart(2, "0"))
        .join("");
  }
  // console.log(scaleDisplay);

  const leftChild = scale?.querySelector(".left_child");
  const neutralChild = scale?.querySelector(".neutral_child");
  const rightChild = scale?.querySelector(".right_child");
  const npsLiteLeftChild = scale?.querySelector(".circle_0");
  const npsLiteCenterChild = scale?.querySelector(".circle_1");
  const npsLiteRightChild = scale?.querySelector(".circle_2");
  const scaleT = scale?.querySelector(".scale_text");
  const scaleTypeHolder = scale?.querySelector(".scaleTypeHolder");

  const [scaleTitle, setScaleTitle] = useState(scaleT ? scaleT.innerHTML : "");

  var scaleColorInput = document.getElementById("scale_color");
  if (scaleColorInput) {
    scaleColorInput.defaultValue = scaleBg;
  }

  var scaleColorStapel = document.getElementById("scale_color_stapel");
  if (scaleColorStapel) {
    scaleColorStapel.defaultValue = scaleBg;
  }

  var scaleColorNpsLite = document.getElementById("scale_color_nps_lite");
  if (scaleColorNpsLite) {
    scaleColorNpsLite.defaultValue = circles;
  }

  var font_color = document.getElementById("font_color");
  if (font_color) {
    font_color.defaultValue = fontColor;
  }

  var font_colorStapel = document.getElementById("font_color_stapel");
  if (font_colorStapel) {
    font_colorStapel.defaultValue = fontColor;
  }

  var npsLiteFontColor = document.getElementById("font_color_nps_lite");
  if (npsLiteFontColor) {
    npsLiteFontColor.defaultValue = fontColor;
  }

  var left = document.getElementById("left");
  if (left) {
    left.defaultValue = leftChild?.textContent;
  }
  var centre = document.getElementById("centre");
  if (centre) {
    centre.defaultValue = neutralChild?.textContent;
  }
  var right = document.getElementById("right");
  if (right) {
    right.defaultValue = rightChild?.textContent;
  }

  var leftText = document.getElementById("left_nps_lite");
  if (leftText) {
    leftText.defaultValue = npsLiteLeftChild?.textContent
      ? npsLiteLeftChild?.textContent
      : "";
  }

  var centerText = document.getElementById("center_nps_lite");
  if (centerText) {
    centerText.defaultValue = npsLiteCenterChild?.textContent
      ? npsLiteCenterChild?.textContent
      : "";
  }

  var rightText = document.getElementById("right_nps_lite");
  if (rightText) {
    rightText.defaultValue = npsLiteRightChild?.textContent
      ? npsLiteRightChild?.textContent
      : "";
  }

  var button_color = document.getElementById("button_color");
  if (button_color) {
    button_color.defaultValue = circles;
  }

  var button_colorStapel = document.getElementById("button_color_stapel");
  if (button_colorStapel) {
    button_colorStapel.defaultValue = circles;
  }
  var format = document.getElementById("format");
  var npsLiteFormat = document.getElementById("format_nps_lite");
  var likertScaleFormat = document.getElementById("label_type_linkert");
  const scaleDisplay = scale?.querySelector(".scool_input");

  // var imageLabel = scale?.querySelector(".images_label");
  var circleLabel = scale?.querySelector(".circle_label")?.textContent;
  const withEmoji = /\p{Extended_Pictographic}/u;

  if (scaleDisplay?.style.display !== "none") {
    if (format) {
      format.selectedIndex = circleLabel?.indexOf("0") !== -1 ? 0 : 1;
    }
    if (npsLiteFormat) {
      npsLiteFormat.selectedIndex = withEmoji.test(circleLabel) ? 1 : 0;
    }
    if (likertScaleFormat) {
      likertScaleFormat.selectedIndex = circleLabel?.indexOf("0") !== -1 ? 0 : 1;
    }
  }

  var likertFontColor = document.getElementById("font_color_likert");
  if (likertFontColor) {
    likertFontColor.defaultValue = fontColor;
  }

  var button_colorLikert = document.getElementById("button_color_likert");
  if (button_colorLikert) {
    button_colorLikert.defaultValue = circles;
  }
  var slider_color_percent_scale = document.getElementById(
    "slider_color_percent_scale"
  );
  if (slider_color_percent_scale) {
    slider_color_percent_scale.defaultValue = scaleBg;
    // }
  }
  var font_color_percent = document.getElementById("font_color_percent");
  if (font_color_percent) {
    font_color_percent.defaultValue = fontColor;
  }

  var percentSumSliderColor = document.getElementById("slider_color_percent_sum_scale");
  if (percentSumSliderColor) {
    percentSumSliderColor.defaultValue = percentSliderBg;
  }

  var percentSumFontColor = document.getElementById("font_color_percent_sum");
  if (percentSumFontColor) {
    percentSumFontColor.defaultValue = fontColor;
  }

  if (scaleTypeHolder?.textContent === "percent_scale") {
    let percentSlider = scale?.querySelector(".percent-slider");
    let sliderValueDisplay = scale?.querySelector(".center-percent");
    function updateSliderValue() {
      let sliderValue = percentSlider.value;
      sliderValueDisplay.textContent = `${sliderValue}%`;
    }
    percentSlider?.addEventListener("input", updateSliderValue);
  }

  if (scaleTypeHolder?.textContent === "percent_sum_scale") {
    let percentSlider = scale?.querySelector(".percent-slider");
    let sliderValueDisplay = scale?.querySelector(".center-percent");
    function updateSliderValue() {
      let sliderValue = percentSlider.value;
      sliderValueDisplay.textContent = `${sliderValue}%`;
    }
    percentSlider?.addEventListener("input", updateSliderValue);
  }
  // console.log(leftChild.innerHTML);
  const handleFormat = () => {
    const format = document.getElementById("format");
    const selectedValue = format.value;
    if (selectedValue === "number") {
      document.getElementById("emoji").style.display = "none";
      document.getElementById("image").style.display = "none";
      setIsEmojiFormat(false);
    } else if (selectedValue === "emoji") {
      document.getElementById("emoji").style.display = "flex";
      document.getElementById("image").style.display = "none";
      setIsEmojiFormat(true);
    } else if (selectedValue === "image") {
      document.getElementById("image").style.display = "flex";
      document.getElementById("emoji").style.display = "none";
      setIsEmojiFormat(false);
    }
  };

  const handleFormatChange = (e) => {
    const format = e.target.value;
    if (format === "snipte") {
      document.getElementById("npsScaleForm").style.display = "none";
      document.getElementById("snippScaleForm").style.display = "flex";
      document.getElementById("npsLiteScaleForm").style.display = "none";
      document.getElementById("percentScaleForm").style.display = "none";
      document.getElementById("percentSumScaleForm").style.display = "none";
      document.getElementById("likertScaleForm").style.display = "none";
    } else if (format === "nps") {
      document.getElementById("snippScaleForm").style.display = "none";
      document.getElementById("npsScaleForm").style.display = "flex";
      document.getElementById("npsLiteScaleForm").style.display = "none";
      document.getElementById("percentScaleForm").style.display = "none";
      document.getElementById("percentSumScaleForm").style.display = "none";
      document.getElementById("likertScaleForm").style.display = "none";
    } else if (format === "nps_lite") {
      document.getElementById("snippScaleForm").style.display = "none";
      document.getElementById("npsScaleForm").style.display = "none";
      document.getElementById("npsLiteScaleForm").style.display = "flex";
      document.getElementById("likertScaleForm").style.display = "none";
      document.getElementById("percentScaleForm").style.display = "none";
      document.getElementById("percentSumScaleForm").style.display = "none";
    } else if (format === "likert") {
      document.getElementById("snippScaleForm").style.display = "none";
      document.getElementById("npsScaleForm").style.display = "none";
      document.getElementById("npsLiteScaleForm").style.display = "none";
      document.getElementById("likertScaleForm").style.display = "flex";
      document.getElementById("percentScaleForm").style.display = "none";
      document.getElementById("percentSumScaleForm").style.display = "none";
    } else if (format === "percent_scale") {
      document.getElementById("snippScaleForm").style.display = "none";
      document.getElementById("npsScaleForm").style.display = "none";
      document.getElementById("likertScaleForm").style.display = "none";
      document.getElementById("npsLiteScaleForm").style.display = "none";
      document.getElementById("percentScaleForm").style.display = "flex";
      document.getElementById("percentSumScaleForm").style.display = "none";
    }
    else if (format === "percent_sum_scale") {
      document.getElementById("snippScaleForm").style.display = "none";
      document.getElementById("npsScaleForm").style.display = "none";
      document.getElementById("likertScaleForm").style.display = "none";
      document.getElementById("npsLiteScaleForm").style.display = "none";
      document.getElementById("percentScaleForm").style.display = "none";
      document.getElementById("percentSumScaleForm").style.display = "flex";
    }
  };

  // const handleScaleType = (e) => {
  //   if((scaleTypeContent === "" || scaleTypeContent === "nps") && scaleTypeHolder.textContent === "nps"){
  //     document.getElementById("npsScaleForm").style.display = "flex";
  //     document.getElementById("snippScaleForm").style.display = "none";
  //   }else if((scaleTypeContent === "" || scaleTypeContent === "snipte") && scaleTypeHolder.textContent === "snipte") {
  //     document.getElementById("snippScaleForm").style.display = "flex";
  //     document.getElementById("npsScaleForm").style.display = "none";
  //   }
  // };

  const handleFormatStapel = () => {
    const format = document.getElementById("format_stapel");
    const selectedValue = format.value;
    if (selectedValue === "number") {
      document.getElementById("emoji_stapel").style.display = "none";
      document.getElementById("image").style.display = "none";
      setIsEmojiFormat(false);
    } else if (selectedValue === "emoji") {
      document.getElementById("emoji_stapel").style.display = "flex";
      document.getElementById("image").style.display = "none";
      setIsEmojiFormat(true);
    } else if (selectedValue === "image") {
      document.getElementById("image").style.display = "flex";
      document.getElementById("emoji").style.display = "none";
      setIsEmojiFormat(false);
    }
  };

  const handleFormatNpsLite = () => {
    const format = document.getElementById("format_nps_lite");
    const selectedValue = format.value;
    if (selectedValue === "text") {
      document.getElementById("emoji_nps_lite").style.display = "none";
    } else if (selectedValue === "emoji") {
      document.getElementById("emoji_nps_lite").style.display = "flex";
    }
  };

  // useEffect(() => {
  //   if (decoded.details.action === "template") {
  //     document.getElementById("npsScaleForm").style.display = "none";
  //     document.getElementById("snippScaleForm").style.display = "none";
  //   }
  // }, []);

  useEffect(() => {
    if (scaleTypeHolder.textContent !== "") {
      setScaleTypeContent(scaleTypeHolder.textContent);
    }

    if (decoded.details.action === "template") {
      if (scaleTypeContent === "" && scaleTypeHolder.textContent === "") {
        document.getElementById("npsScaleForm").style.display = "none";
        document.getElementById("snippScaleForm").style.display = "none";
        document.getElementById("npsLiteScaleForm").style.display = "none";
        document.getElementById("likertScaleForm").style.display = "none";
        document.getElementById("percentScaleForm").style.display = "none";
        document.getElementById("percentSumScaleForm").style.display = "none";
      } else if (
        (scaleTypeContent === "" || scaleTypeContent === "nps") &&
        (scaleTypeHolder.textContent === "nps" ||
          scaleTypeHolder.textContent === "")
      ) {
        document.getElementById("npsScaleForm").style.display = "flex";
        document.getElementById("snippScaleForm").style.display = "none";
        document.getElementById("npsLiteScaleForm").style.display = "none";
        document.getElementById("likertScaleForm").style.display = "none";
        document.getElementById("percentScaleForm").style.display = "none";
        document.getElementById("percentSumScaleForm").style.display = "none";
      } else if (
        (scaleTypeContent === "" || scaleTypeContent === "snipte") &&
        (scaleTypeHolder.textContent === "snipte" ||
          scaleTypeHolder.textContent === "")
      ) {
        document.getElementById("snippScaleForm").style.display = "flex";
        document.getElementById("npsScaleForm").style.display = "none";
        document.getElementById("npsLiteScaleForm").style.display = "none";
        document.getElementById("likertScaleForm").style.display = "none";
        document.getElementById("percentScaleForm").style.display = "none";
        document.getElementById("percentSumScaleForm").style.display = "none";
      } else if (
        (scaleTypeContent === "" || scaleTypeContent === "nps_lite") &&
        (scaleTypeHolder.textContent === "nps_lite" ||
          scaleTypeHolder.textContent === "")
      ) {
        document.getElementById("npsLiteScaleForm").style.display = "flex";
        document.getElementById("npsScaleForm").style.display = "none";
        document.getElementById("snippScaleForm").style.display = "none";
        document.getElementById("likertScaleForm").style.display = "none";
        document.getElementById("percentScaleForm").style.display = "none";
        document.getElementById("percentSumScaleForm").style.display = "none";
      } else if (
        (scaleTypeContent === "" || scaleTypeContent === "likert") &&
        (scaleTypeHolder.textContent === "likert" ||
          scaleTypeHolder.textContent === "")
      ) {
        document.getElementById("likertScaleForm").style.display = "flex";
        document.getElementById("npsScaleForm").style.display = "none";
        document.getElementById("snippScaleForm").style.display = "none";
        document.getElementById("npsLiteScaleForm").style.display = "none";
        document.getElementById("percentScaleForm").style.display = "none";
        document.getElementById("percentSumScaleForm").style.display = "none";
      } else if (
        (scaleTypeContent === "" || scaleTypeContent === "percent_scale") &&
        (scaleTypeHolder.textContent === "percent_scale" ||
          scaleTypeHolder.textContent === "")
      ) {
        document.getElementById("likertScaleForm").style.display = "none";
        document.getElementById("npsScaleForm").style.display = "none";
        document.getElementById("snippScaleForm").style.display = "none";
        document.getElementById("npsLiteScaleForm").style.display = "none";
        document.getElementById("percentScaleForm").style.display = "flex";
        document.getElementById("percentSumScaleForm").style.display = "none";
      } else if (
        (scaleTypeContent === "" || scaleTypeContent === "percent_sum_scale") &&
        (scaleTypeHolder.textContent === "percent_sum_scale" ||
          scaleTypeHolder.textContent === "")
      ) {
        document.getElementById("likertScaleForm").style.display = "none";
        document.getElementById("npsScaleForm").style.display = "none";
        document.getElementById("snippScaleForm").style.display = "none";
        document.getElementById("npsLiteScaleForm").style.display = "none";
        document.getElementById("percentScaleForm").style.display = "none";
        document.getElementById("percentSumScaleForm").style.display = "flex";
      }
    }
  }, []);

  const [labelType, setLabelType] = useState("Select Label Type");
  const [labelScale, setLabelScale] = useState("--Select Choice--");
  const [labelTexts, setLabelTexts] = useState([]);
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [activeEmojiPicker, setActiveEmojiPicker] = useState(null); // Track active emoji picker for text label type

  const handleLabelTypeChange = (event) => {
    const selectedValue = event.target.value;
    setLabelType(selectedValue);
    setLabelTexts([]); // Reset labelTexts when changing label type
    setSelectedEmojis([]); // Reset selectedEmojis when changing label type
    setActiveEmojiPicker(null); // Reset active emoji picker when changing label type
  };

  const handleLabelScaleChange = (event) => {
    const selectedValue = event.target.value;
    setLabelScale(selectedValue);

    // Create new input fields based on the selected value
    if (labelType === "Text") {
      setLabelTexts(
        Array.from({ length: Number(selectedValue) }, (_, index) => "")
      );
      setSelectedEmojis(
        Array.from({ length: Number(selectedValue) }, () => "")
      );
      setActiveEmojiPicker(null); // Reset active emoji picker for text label type
    }
  };

  var likertText = document.querySelectorAll("label-text-input");
  const updatedLabels = labelType === "Text" ? labelTexts : selectedEmojis;
  if (likertText) {
    likertText.defaultValue = updatedLabels;
  }

  const handleEmojiChange = (index, emoji) => {
    // Check if the emoji is already selected for another input
    if (selectedEmojis.includes(emoji)) {
      alert(
        "This emoji is already selected for another input. Please select a different emoji."
      );
      return;
    }

    const updatedSelectedEmojis = [...selectedEmojis];
    updatedSelectedEmojis[index] = emoji;
    setSelectedEmojis(updatedSelectedEmojis);
  };

  const handleLabelTextChange = (index, event) => {
    const updatedLabelTexts = [...labelTexts];
    updatedLabelTexts[index] = event.target.value;
    setLabelTexts(updatedLabelTexts);
  };

  const areAllTextInputsFilled = labelTexts.every(
    (labelText) => labelText.trim() !== ""
  );
  const areAllImageEmojisFilled = selectedEmojis.some((emoji) => emoji);

  const isUpdateButtonDisabled =
    (labelType === "Text" &&
      (!areAllTextInputsFilled || labelScale === "--Select Choice--")) ||
    (labelType === "Image" &&
      (!areAllImageEmojisFilled || labelScale === "--Select Choice--"));

  const [selectedImages, setSelectedImages] = useState([]);

  const handleImage = (event) => {
    const files = Array.from(event.target.files);

    const imagePromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const maxDimension = 13; // Maximum dimension for the resized image
            let width = img.width;
            let height = img.height;

            if (width > height && width > maxDimension) {
              height *= maxDimension / width;
              width = maxDimension;
            } else if (height > width && height > maxDimension) {
              width *= maxDimension / height;
              height = maxDimension;
            } else if (width === height && width > maxDimension) {
              width = height = maxDimension;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            resolve(canvas.toDataURL());
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises)
      .then((imageData) => {
        setSelectedImages((prevImages) => [...prevImages, ...imageData]);
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
  };

  const onEmojiClick = (emojiObject) => {
    const emoji = emojiObject.emoji;
    if (inputStr.includes(emoji)) {
      alert("The is already selected");
    } else {
      setInputStr((prevInputStr) => prevInputStr + emoji);
      setShowPicker(false);
    }
  };
  const [borderSize, setBorderSize] = useState(
    Number(localStorage.getItem("borderSize")) || 0
  );
  const [borderColor, setBorderColor] = useState(
    localStorage.getItem("borderColor") || "#000000"
  );
  const [showSlider, setShowSlider] = useState(false);

  const [iframeKey, setIframeKey] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  var decoded = jwt_decode(token);
  console.log(data, "data");
  console.log(companyId);

  const holderDIV = document.querySelector(".focussedd");
  // const scaleId = holderDIV?.children[1].innerHTML;
  const label = holderDIV?.children[2];

  const handleChange = (e) => {
    label.innerHTML = e.target.value;
  };

  useEffect(() => {
    setCustom1(localStorage.getItem("inputValue1"));
    setCustom2(localStorage.getItem("inputValue2"));
    setCustom3(localStorage.getItem("inputValue3"));
    localStorage.setItem("borderSize", borderSize === "0");
    localStorage.setItem("borderColor", borderColor === "black");
  }, [borderSize, borderColor]);

  // useEffect(() => {
  //   // Access the iframe's window object and add an event listener to it
  //   const iframeWindow = document.getElementById("update_ifr");
  //   iframeWindow.addEventListener('click', handleClick);

  //   // Remove the event listener when the component unmounts
  //   return () => {
  //     iframeWindow.removeEventListener('blur', handleClick);
  //   };
  // }, []);
  // function handleClick(event) {
  //   console.log('Click event inside iframe:', event);
  //   setIframeKey(prevKey => prevKey + 1);
  // }

  function sendMessage() {
    const message =
      decoded.details.action === "document"
        ? "Document saved"
        : "Template saved";
    const iframe = document.querySelector("iframe");
    iframe?.contentWindow?.postMessage(message, "*");
  }

  const handleProductCountChange = (e) => {
    const newCount = parseInt(e.target.value, 10) || 0;
    setProductCount(newCount);

    // Update the input fields array
    const newInputFields = [];
    for (let i = 0; i < newCount; i++) {
      newInputFields.push(
        <input key={i} type="text" placeholder={`Product ${i + 1}`} required />
      );
    }
    setInputFields(newInputFields);
  };

  function scaleSubmit(e) {
    console.log(selectedOptions);
    console.log(selectedOptions[0]);
    const scale = document.querySelector(".focussedd");
    const idHolder = scale?.querySelector(".scaleId");
    console.log("This is the scale Id", idHolder.textContent);
    e.preventDefault();
    setIsLoading(true);
    Axios.post("https://100035.pythonanywhere.com/api/nps_custom_data/", {
      template_id: decoded.details._id,
      scale_id: idHolder.textContent,
      custom_input_groupings: selectedOptions,
      scale_label: scaleTitle,
    })
      .then((res) => {
        if (res.status == 200) {
          setIsLoading(false);
          sendMessage();
          console.log(res.data);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  console.log(scale);

  const handleInputChange = (event) => {
    const selectedValue = event.target.value;
    setPercentSumInputValue(selectedValue);
    if (selectedValue == "" ) {
      setPercentSumLabelTexts([]);
    }   
  };

  const handleKeyDownPress = (event) => {
    if (event.key === 'Enter') {
      const selectedValue = event.target.value;
      if (Number(selectedValue) >= 2 && Number(selectedValue) <= 10) {
        setPercentSumLabelTexts(
          Array.from({ length: Number(selectedValue) }, (_, index) => "")
        );
      } else {
        alert(`You entered ${selectedValue}. Product Count value should be between 2 to 10 only`);
        setPercentSumInputValue("")
      }
    }
  }

  const handlePercentSumLabelTextChange = (index, event) => {
    const updatedLabelTexts = [...percentSumLabelTexts];
    updatedLabelTexts[index] = event.target.value;
    setPercentSumLabelTexts(updatedLabelTexts);
    
    let productNames = document.getElementById("product_count_label");
    let inputFields = productNames?.querySelectorAll("input");
    const hasInputValues = [...inputFields].every((inputField) => inputField.value != "");
    if (hasInputValues) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  };

  const handleUpdates = () => {
    const scaleType = document.getElementById("scaleType");
    setScaleTypeContent(scaleType ? scaleType.value : scaleTypeContent);
    const scaleTypeHolder = scale?.querySelector(".scaleTypeHolder");
    scaleTypeHolder.textContent = scaleType
      ? scaleType.value
      : scaleTypeContent;
    if (
      scaleType
        ? scaleType.value === "nps" || scaleTypeContent === "nps"
        : scaleTypeContent === "nps" || scaleTypeHolder.textContent === "nps"
    ) {
      const scale = document.querySelector(".focussedd");
      console.log(scale);
      const circles = scale?.querySelector(".circle_label");
      console.log(circles);
      const btnUpdateButton = document.getElementById("button_color");
      const emojiInp = document.getElementById("emojiInp").value;
      const btnUpdateScale = document.getElementById("scale_color");
      const btnUpdateFontColor = document.getElementById("font_color");
      const btnUpdateScaleFont = document.getElementById("font_style");
      const beNametnUpdateScal = document.getElementById("scaleLabel");

      const headerText = document.getElementById("headerText");
      console.log(headerText);
      console.log(btnUpdateScale);
      // const btnUpdateOrientation = document.getElementById("orientation");
      const btnUpdateLeft = document.getElementById("left");
      const btnUpdateRight = document.getElementById("right");
      const btnUpdateCenter = document.getElementById("centre");
      // const btnUpdateScales = document.getElementById("scales");
      // const btnUpdateScore = document.getElementById("score");
      const btnUpdateScaleLabel = document.getElementById("scaleLabel");
      // const btnUpdateTime = document.getElementById("time");
      // const btnUpdateFormat = document.getElementById("select");
      // const button1 = document.querySelector(".focussed");

      const button = scale?.querySelector(".label_hold");
      // const btnParent = document.getElementById("parent");
      const scaleText = scale?.querySelector(".scale_text");
      // const buttonScaleField = document.querySelector(".scaleInput");
      const button4 = scale?.querySelector(".scool_input");
      const font = scale?.querySelector(".newScaleInput");
      console.log(font);
      console.log(button4);
      const buttonCircle = scale ? scale.querySelectorAll(".circle_label") : [];
      const labelHold = scale?.querySelector(".label_hold");
      const buttonImage = scale?.querySelectorAll(".image_label");
      console.log(buttonImage);
      const buttonCircleM = scale?.querySelector(".circle_label");
      const buttonChild = scale?.querySelector("#child");
      console.log(buttonChild);
      const buttonChildLeft = scale?.querySelector(".left_child");
      const buttonChildRight = scale?.querySelector(".right_child");
      const buttonChildNeutral = scale?.querySelector(".neutral_child");
      const buttonImageRight = document.getElementById("ImageUpload");
      const optionSelect = document.getElementById("format");
      const option =
        document.querySelector("#orientationId").options[
          document.querySelector("#orientationId").selectedIndex
        ];
      const test = document.querySelector("select");
      console.log(test);
      console.log(option);

      let tempText = scale?.querySelector(".tempText");
      tempText?.remove();
      button4.style.display = "block";
      if (btnUpdateScale.value !== "") {
        button.style.backgroundColor = btnUpdateScale.value;
      }

      labelHold.innerHTML = "";

      for (let i = 0; i <= 10; i++) {
        const selectedOption = optionSelect.value;
        const circle = document.createElement("div");
        circle.className = "circle_label";
        circle.textContent = i;

        // Apply circular background using inline style
        circle.style.width = "35%";
        circle.style.height = "35%";
        circle.style.borderRadius = "50%";
        circle.style.display = "flex";
        circle.style.justifyContent = "center";
        circle.style.alignItems = "center";
        circle.style.backgroundColor = btnUpdateButton.value;
        labelHold.appendChild(circle);
        if (selectedOption === "emoji" && emojiInp !== "") {
          // Set the text content of the div to the corresponding emoji
          const emojiFormat = /(\p{Emoji}|\uFE0F)/gu;
          const emojis = emojiInp
            .split(emojiFormat)
            .filter((emoji) => emoji !== "");
          circle.textContent = emojis[i % emojis.length];
          circle.style.fontSize = "1.8vw";
        } else {
          // Set the text content of the div to the number
          circle.textContent = i;
        }
      }

      if (btnUpdateFontColor.value !== "") {
        button4.style.color = btnUpdateFontColor.value;
      }

      if (btnUpdateScaleFont.value !== "") {
        button4.style.fontFamily = btnUpdateScaleFont.value;
      }

      const selectedOption = optionSelect.value;

      if (option.value === "Horizontal") {
        button4.style.border = "block";
        button4.style.textAlign = "center";
        button.style.display = "flex";
        button.style.flexDirection = "row";
        // button.style.marginTop = "5%";
        button.style.alignItems = "center";
        // buttonCircle.style.flexDirection = "row";
        button.style.height = "85%";
        button.style.width = "100%";
        button.style.flexDirection = "row";
        buttonChildRight.style.marginTop = "0px";
        buttonChildNeutral.style.marginTop = "0px";
        buttonChild.style.flexDirection = "row";
        buttonChild.style.justifyContent = "space-between";
        buttonChild.style.alignItems = "center";
        button.style.position = "relative";
        buttonChild.style.marginLeft = "0px";
        button.style.marginLeft = "0px";
      }

      if (option.value === "Vertical") {
        labelHold.style.height = "82%";
        labelHold.style.top = "54%";
        labelHold.style.left = "50%";
        labelHold.style.transform = "translate(-50%, -50%)";
        button4.style.border = "none";
        button4.style.textAlign = "center";
        button.style.width = "30%";
        button.style.position = "absolute";
        button.style.flexDirection = "column";
        button.style.alignItems = "center";
        button.style.marginTop = "0";
        buttonChild.style.display = "flex";
        buttonChild.style.flexDirection = "column";
        buttonChild.style.justifyContent = "space-between";

        buttonChild.style.alignItems = "flex-start";
        buttonChild.style.width = "32%";
        buttonChild.style.marginLeft = "auto";
        buttonChild.style.height = "98%";

        buttonCircleM.style.marginTop = "2px";
      }

      buttonChildLeft.textContent = btnUpdateLeft.value;

      buttonChildRight.textContent = btnUpdateRight.value;

      buttonChildNeutral.style.display = "block";
      buttonChildNeutral.textContent = btnUpdateCenter.value;
      // if (btnUpdateScales.value !=="") {
      //   button4.style.textContent = btnUpdateScales.value;
      // }
      // if (btnUpdateScore.value !=="") {
      //   buttonChild.style.color = btnUpdateScore.value;
      // }
      if (beNametnUpdateScal.value !== "") {
        scaleText.textContent = beNametnUpdateScal.value;
      }
      console.log(btnUpdateButton.value);
      console.log(btnUpdateScale.value);
      console.log(btnUpdateFontColor.value);
      // setScaleId("");
      const idHolder = scale?.querySelector(".scaleId");
      console.log(idHolder);
      console.log(scaleId);
      let timeId = document.getElementById("timeId");
      let time = document.getElementById("time");

      const prepareImageLabels = () => {
        const imageLabels = {};

        const repeatedImages = [];
        const selectedCount = Math.min(selectedImages.length, 11); // Replace 11 with the actual label count

        for (let i = 0; i < 11; i++) {
          // Replace 11 with the actual label count
          const imageIndex = i % selectedCount;
          repeatedImages.push(selectedImages[imageIndex]);
        }

        for (let i = 0; i < 11; i++) {
          // Replace 11 with the actual label count
          imageLabels[i] = repeatedImages[i];
        }

        return imageLabels;
      };
      const prepareEmojiLabels = () => {
        const emojiFormat = /(\p{Emoji}|\uFE0F)/gu;
        const emojis = inputStr
          .split(emojiFormat)
          .filter((emoji) => emoji !== "");

        const emojiLabels = {};

        const repeatedEmoji = [];
        const selectedCount = Math.min(emojis.length, 11); // Replace 11 with the actual label count

        for (let i = 0; i < 11; i++) {
          // Replace 11 with the actual label count
          const emojindex = i % selectedCount;
          repeatedEmoji.push(emojis[emojindex]);
        }

        for (let i = 0; i < 11; i++) {
          // Replace 11 with the actual label count
          emojiLabels[i] = repeatedEmoji[i];
        }

        return emojiLabels;
      };
      const emojiLabels = prepareEmojiLabels();
      const imageLabels = prepareImageLabels();
      console.log(imageLabels);

      if (
        idHolder.textContent === "scale Id" ||
        idHolder.textContent === "id"
      ) {
        setIsLoading(true);
        console.log("post req");
        Axios.post("https://100035.pythonanywhere.com/api/nps_create/", {
          user: "true",
          username: "NdoneAmbrose",
          orientation: option?.value,
          scalecolor: btnUpdateScale.value,
          roundcolor: btnUpdateButton.value,
          fontcolor: btnUpdateFontColor.value,
          fomat: "numbers",
          allow_resp: false,
          show_total_score: true,
          no_of_scales: 6,
          time: timeId.style.display === "none" ? "00" : time?.value,
          name: beNametnUpdateScal.value,
          left: btnUpdateLeft.value,
          right: btnUpdateRight.value,
          center: btnUpdateCenter.value,
          image_label_format: imageLabels,
          fontstyle: btnUpdateScaleFont.value,
          custom_emoji_format: emojiLabels,
        })
          .then((res) => {
            setIsLoading(false);
            sendMessage();
            setScaleData(res.data);
            const success = res.data.success;
            var successObj = JSON.parse(success);
            const id = successObj.inserted_id;
            console.log(id);
            if (id.length) {
              setScaleId(id && id);
              const idHolder = scale?.querySelector(".scaleId");
              idHolder.textContent = id && id;
            }
            console.log(res);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
      } else {
        setIsLoading(true);
        console.log("PUT req");
        console.log(idHolder.textContent);
        Axios.put("https://100035.pythonanywhere.com/api/nps_create/", {
          user: "true",
          scale_id: idHolder.textContent,
          username: "NdoneAmbrose",
          orientation: option?.value,
          scalecolor: btnUpdateScale.value,
          roundcolor: btnUpdateButton.value,
          fontcolor: btnUpdateFontColor.value,
          fomat: selectedOption,
          allow_resp: false,
          show_total_score: true,
          no_of_scales: 6,
          time: timeId?.style?.display === "none" ? "00" : time?.value,
          name: beNametnUpdateScal.value,
          left: btnUpdateLeft.value,
          right: btnUpdateRight.value,
          center: btnUpdateCenter.value,
          label_images: { 0: "imagefile", 1: "imagefile", 2: "imagefile" },
          fontstyle: btnUpdateScaleFont.value,
          custom_emoji_format: emojiLabels,
        })
          .then((res) => {
            if (res.status == 200) {
              setIsLoading(false);
              sendMessage();
              setScaleData(res.data);
              setScaleId(scaleId);
              console.log(res);
              console.log("This is the still scale", scale);
            }
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err.message);
          });
      }
    } else if (
      scaleType
        ? scaleType.value === "snipte" || scaleTypeContent === "snipte"
        : scaleTypeContent === "snipte" ||
          scaleTypeHolder.textContent === "snipte"
    ) {
      const scale = document.querySelector(".focussedd");
      console.log(scale);

      const btnUpdateScale = document.getElementById("scale_color_stapel");
      const btnUpdateFontColor = document.getElementById("font_color_stapel");
      const btnUpdateButton = document.getElementById("button_color_stapel");
      const beNametnUpdateScal = document.getElementById("scaleLabel_stapel");

      // const headerText = document.getElementById("headerText");
      const btnUpdateLeft = document.getElementById("leftStapel");
      const btnUpdateRight = document.getElementById("rightStapel");
      const btnUpdateCenter = document.getElementById("centre");
      // let upperVal = document.getElementById("upperVal").value;
      // console.log(value?.value);
      // console.log(value);

      const button = scale?.querySelector(".label_hold");
      const scaleText = scale?.querySelector(".scale_text");
      const button4 = scale?.querySelector(".scool_input");
      const font = scale?.querySelector(".newScaleInput");
      const savedStapelScaleArr = scale?.querySelector(".stapelScaleArray");
      const savedOptionHolder = scale?.querySelector(".stapelOptionHolder");

      // const buttonCircle = document.querySelectorAll(".circle_label");
      const buttonCircle = scale
        ? document.querySelectorAll(".circle_label")
        : [];
      const buttonChild = scale?.querySelector("#child");
      const btnUpdateScaleFontStapel =
        document.getElementById("font_style_stapel");
      const buttonChildLeft = scale?.querySelector(".left_child");
      const buttonChildRight = scale?.querySelector(".right_child");
      const buttonChildNeutral = scale?.querySelector(".neutral_child");
      const optionSelect = document.getElementById("format_stapel");
      const option = document.querySelector("#orientationIdStapel").options[
        document.querySelector("#orientationIdStapel").selectedIndex
      ];
      let timeId = document.getElementById("timeId_stapel");
      let time = document.getElementById("time_stapel");
      const emojiInp = document.getElementById("emojiInp_stapel").value;
      let tempText = scale?.querySelector(".tempText");
      const labelHold = scale?.querySelector(".label_hold");
      const upperVal = Math.min(
        10,
        parseInt(document.getElementById("upperVal").value, 10)
      );
      const spacing = parseInt(document.getElementById("spacing").value, 10);
      const lowerVal = -upperVal;
      tempText?.remove();

      // for (let i = 0; i < buttonCircle.length; i++) {
      //   if (btnUpdateButton.value !== "") {
      //     buttonCircle[i].style.backgroundColor = btnUpdateButton.value;
      //   }
      // }

      // if (scaleText) {
      //   console.log(scaleText);
      //   scaleText.innerHTML = "Stapel scale";
      // }

      const stapelScaleArray = document.createElement("div");
      stapelScaleArray.className = "stapelScaleArray";
      stapelScaleArray.textContent = "";
      stapelScaleArray.style.display = "none";

      // Construct row of values
      const selectedOption = optionSelect.value;
      const optionHolder = document.createElement("div");
      optionHolder.className = "stapelOptionHolder";
      optionHolder.style.display = "none";

      const prepareEmojiLabels = () => {
        const emojiFormat = /(\p{Emoji}|\uFE0F)/gu;
        const emojis = inputStr
          .split(emojiFormat)
          .filter((emoji) => emoji !== "");

        const emojiLabels = {};

        const selectedCount = Math.min(
          emojis.length,
          Math.abs(Math.floor(upperLimit / space) * 2) +
            Math.abs(-Math.floor(upperLimit / space) * 2) +
            spacing
        );

        for (
          let i = -Math.floor(upperLimit / space) * 2;
          i <= Math.floor(upperLimit / space) * 2;
          i += spacing
        ) {
          if (i !== 0) {
            const emojiIndex =
              (i >= 0
                ? i - -Math.floor(upperLimit / space) * 2
                : Math.abs(Math.floor(upperLimit / space) * 2) + i) %
              selectedCount;
            emojiLabels[i] = emojis[emojiIndex];
          }
        }

        return emojiLabels;
      };
      const emojiLabels = prepareEmojiLabels();

      if (option.value === "Horizontal") {
        button4.style.border = "block";
        button4.style.textAlign = "center";
        button.style.display = "flex";
        button.style.flexDirection = "row";
        // button.style.marginTop = "5%";
        button.style.alignItems = "center";
        // buttonCircle.style.flexDirection = "row";
        button.style.height = "85%";
        button.style.width = "100%";
        button.style.flexDirection = "row";
        buttonChildRight.style.marginTop = "0px";
        buttonChildNeutral.style.marginTop = "0px";
        buttonChild.style.flexDirection = "row";
        buttonChild.style.justifyContent = "space-between";
        buttonChild.style.alignItems = "center";
        button.style.position = "relative";
        buttonChild.style.marginLeft = "0px";
        button.style.marginLeft = "0px";
      }

      if (option.value === "Vertical") {
        labelHold.style.height = "82%";

        labelHold.style.top = "54%";
        labelHold.style.left = "50%";
        labelHold.style.transform = "translate(-50%, -50%)";
        button4.style.border = "none";
        button4.style.textAlign = "center";
        button.style.width = "30%";
        button.style.position = "absolute";
        button.style.flexDirection = "column";
        button.style.alignItems = "center";
        buttonChild.style.display = "flex";
        buttonChild.style.flexDirection = "column";
        buttonChild.style.justifyContent = "space-between";

        buttonChild.style.alignItems = "flex-start";
        buttonChild.style.width = "32%";
        buttonChild.style.marginLeft = "auto";
        buttonChild.style.height = "98%";
      }

      if (
        idHolder.textContent === "scale Id" ||
        idHolder.textContent === "id"
      ) {
        setIsLoading(true);
        console.log("post req");
        Axios.post(
          "https://100035.pythonanywhere.com/stapel/api/stapel_settings_create/",
          {
            user: "true",
            username: "TadesseJemal",
            orientation: option?.value,
            spacing_unit: spacing,
            scale_upper_limit: upperVal,
            scalecolor: btnUpdateScale.value,
            roundcolor: btnUpdateButton.value,
            fontcolor: btnUpdateFontColor.value,
            fomat: selectedOption,
            time: timeId.style.display === "none" ? "00" : time?.value,
            name: beNametnUpdateScal.value,
            left: btnUpdateLeft.value,
            right: btnUpdateRight.value,
            label_images: { 0: "imagefile", 1: "imagefile", 2: "imagefile" },
            fontstyle: btnUpdateScaleFontStapel.value,
            custom_emoji_format: emojiLabels,
          }
        )
          .then((res) => {
            setIsLoading(false);
            sendMessage();
            setScaleData(res.data);
            const success = res.data.success;
            var successObj = JSON.parse(success);
            const id = successObj.inserted_id;
            console.log(id);
            if (id.length) {
              setScaleId(id && id);
              const idHolder = scale?.querySelector(".scaleId");
              idHolder.textContent = id && id;
            }

            console.log("This is the stapel  scale response", res.data.data);
            console.log(
              "This is scale type holder",
              scaleTypeHolder.textContent
            );
            const scaleArr = res.data.data.settings.scale;
            const fomart = res.data.data.settings.fomat;

            button4.style.display = "block";

            // Clear existing values
            labelHold.innerHTML = "";

            for (let i = 0; i < scaleArr.length; i++) {
              const circle = document.createElement("div");
              circle.className = "circle_label";
              circle.textContent = scaleArr[i];
              labelHold.appendChild(circle);
              circle.style.width = "35%";
              circle.style.height = "35%";
              circle.style.borderRadius = "50%";
              circle.style.display = "flex";
              circle.style.justifyContent = "center";
              circle.style.alignItems = "center";
              circle.style.margin = "0 2px";
              circle.style.backgroundColor = res.data.data.settings.roundcolor;
              if (fomart === "emoji") {
                // Set the text content of the div to the corresponding emoji
                circle.textContent =
                  res.data.data.settings.custom_emoji_format[scaleArr[i]];
                circle.style.fontSize = "1.8vw";
              } else {
                // Set the text content of the div to the number
                circle.textContent = scaleArr[i];
              }
            }

            button.style.backgroundColor = res.data.data.settings.scalecolor;
            button4.style.color = res.data.data.settings.fontcolor;
            scaleText.textContent = res.data.data.settings.name;
            buttonChildLeft.textContent = res.data.data.settings.left;
            buttonChildRight.textContent = res.data.data.settings.right;
            optionHolder.textContent = res.data.data.settings.fomat;
            button4.style.fontFamily = res.data.data.settings.fontstyle;
            labelHold.appendChild(optionHolder);
            stapelScaleArray.textContent = res.data.data.settings.scale;
            labelHold.append(stapelScaleArray);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
      } else {
        setIsLoading(true);
        console.log("PUT req");
        console.log(idHolder.textContent);
        Axios.put(
          "https://100035.pythonanywhere.com/stapel/api/stapel_settings_create/",
          {
            scale_id: idHolder.textContent,
            fomat: selectedOption,
            scale_upper_limit: upperVal,
            spacing_unit: spacing,
            scalecolor: btnUpdateScale.value,
            roundcolor: btnUpdateButton.value,
            fontcolor: btnUpdateFontColor.value,
            time: timeId?.style?.display === "none" ? "00" : time?.value,
            name: beNametnUpdateScal.value,
            left: btnUpdateLeft.value,
            right: btnUpdateRight.value,
            label_images: { 0: "imagefile", 1: "imagefile", 2: "imagefile" },
            fontstyle: btnUpdateScaleFontStapel.value,
            custom_emoji_format: emojiLabels,
          }
        )
          .then((res) => {
            if (res.status == 200) {
              setIsLoading(false);
              sendMessage();
              setScaleData(res.data);
              setScaleId(scaleId);
              console.log(res);
              console.log("This is the still scale", scale);
              savedStapelScaleArr.textContent = res.data.data.settings.scale;
              savedOptionHolder.textContent = res.data.data.settings.fomat;
              console.log("This is the option", savedOptionHolder.textContent);
              console.log("This is stapel update", res.data.data);
              const scaleArr = res.data.data.settings.scale;
              const fomart = res.data.data.settings.fomat;
              console.log(savedStapelScaleArr);
              button4.style.display = "block";

              // Clear existing values
              labelHold.innerHTML = "";

              for (let i = 0; i < scaleArr.length; i++) {
                const circle = document.createElement("div");
                circle.className = "circle_label";
                circle.textContent = scaleArr[i];
                labelHold.appendChild(circle);
                circle.style.width = "35%";
                circle.style.height = "35%";
                circle.style.borderRadius = "50%";
                circle.style.display = "flex";
                circle.style.justifyContent = "center";
                circle.style.alignItems = "center";
                circle.style.margin = "0 2px";
                circle.style.backgroundColor =
                  res.data.data.settings.roundcolor;
                if (fomart === "emoji") {
                  // Set the text content of the div to the corresponding emoji
                  circle.textContent =
                    res.data.data.settings.custom_emoji_format[scaleArr[i]];
                  circle.style.fontSize = "1.8vw";
                } else {
                  // Set the text content of the div to the number
                  circle.textContent = scaleArr[i];
                }
              }

              button.style.backgroundColor = res.data.data.settings.scalecolor;
              button4.style.color = res.data.data.settings.fontcolor;
              scaleText.textContent = res.data.data.settings.name;
              buttonChildLeft.textContent = res.data.data.settings.left;
              buttonChildRight.textContent = res.data.data.settings.right;
              optionHolder.textContent = res.data.data.settings.fomat;
              labelHold.appendChild(optionHolder);
              stapelScaleArray.textContent = res.data.data.settings.scale;
              labelHold.append(stapelScaleArray);
            }
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err.message);
          });
      }
      // if (btnUpdateScales.value !=="") {
      //   button4.style.textContent = btnUpdateScales.value;
      // }
      // if (btnUpdateScore.value !=="") {
      //   buttonChild.style.color = btnUpdateScore.value;
      // }
      // if (beNametnUpdateScal.value !== "") {
      //   scaleText.textContent = beNametnUpdateScal.value;
      // }
    } else if (
      scaleType
        ? scaleType.value === "nps_lite" || scaleTypeContent === "nps_lite"
        : scaleTypeContent === "nps_lite" ||
          scaleTypeHolder.textContent === "nps_lite"
    ) {
      const btnUpdateScale = document.getElementById("scale_color_nps_lite");
      const btnUpdateFontColor = document.getElementById("font_color_nps_lite");
      const btnUpdateScaleFont = document.getElementById("font_style_nps_lite");
      const beNametnUpdateScal = document.getElementById(
        "scale_label_nps_lite"
      );

      const btnUpdateLeft = document.getElementById("left_nps_lite");
      const btnUpdateRight = document.getElementById("right_nps_lite");
      const btnUpdateCenter = document.getElementById("center_nps_lite");
      const optionSelect = document.getElementById("format_nps_lite");

      const button = scale?.querySelector(".label_hold");
      const scaleText = scale?.querySelector(".scale_text");
      const button4 = scale?.querySelector(".scool_input");

      const buttonChildLeft = scale?.querySelector(".left_child");
      const buttonChildRight = scale?.querySelector(".right_child");
      const buttonChildNeutral = scale?.querySelector(".neutral_child");

      const option = document.querySelector("#orientationId_nps_lite").options[
        document.querySelector("#orientationId_nps_lite").selectedIndex
      ];
      let timeId = document.getElementById("timeId_nps_lite");
      let time = document.getElementById("time_nps_lite");
      const emojiInp = document.getElementById("emoji_inp_nps_lite").value;

      let labelHold = scale?.querySelector(".label_hold");
      labelHold.style.display = "";
      let tempText = scale?.querySelector(".tempText");
      tempText?.remove();

      if (beNametnUpdateScal.value !== "") {
        scaleText.textContent = beNametnUpdateScal.value;
      }

      if (btnUpdateFontColor.value !== "") {
        button4.style.color = btnUpdateFontColor.value;
      }

      if (btnUpdateScaleFont.value !== "") {
        button4.style.fontFamily = btnUpdateScaleFont.value;
      }

      buttonChildLeft.textContent = "";
      buttonChildNeutral.textContent = "";
      buttonChildRight.textContent = "";

      button4.style.display = "block";

      const textValues = [
        btnUpdateLeft.value,
        btnUpdateCenter.value,
        btnUpdateRight.value,
      ];

      labelHold.innerHTML = "";
      const selectedOption = optionSelect.value;

      const npsLiteTextArray = document.createElement("div");
      npsLiteTextArray.className = "nps_lite_text";
      npsLiteTextArray.textContent = [...textValues];
      npsLiteTextArray.style.display = "none";
      labelHold.append(npsLiteTextArray);

      for (let i = 0; i < textValues.length; i++) {
        const selectedOption = optionSelect.value;
        const circle = document.createElement("div");
        circle.className = `circle_label circle_${i}`;
        circle.textContent = textValues[i];

        circle.style.borderRadius = "25px";
        circle.style.padding = "12px 27px";
        circle.style.margin = "0 auto";
        circle.style.display = "flex";
        circle.style.justifyContent = "center";
        circle.style.alignItems = "center";
        circle.style.width = "27%";
        circle.style.height = "35%";
        circle.style.fontSize = "18px";
        circle.style.backgroundColor = btnUpdateScale.value;

        if (option.value === "Vertical") {
          circle.style.margin = "15px 0";
          circle.style.padding = "10px 30px";
        }

        labelHold.appendChild(circle);

        if (selectedOption === "emoji" && emojiInp !== "") {
          // Set the text content of the div to the corresponding emoji
          const emojiFormat = /(\p{Emoji}|\uFE0F)/gu;
          const emojis = emojiInp
            .split(emojiFormat)
            .filter((emoji) => emoji !== "");
          circle.textContent = emojis[i % emojis.length];
        } else {
          circle.textContent = textValues[i];
        }
      }

      const prepareEmojiLabels = () => {
        const emojiFormat = /(\p{Emoji}|\uFE0F)/gu;
        const emojis = inputStr
          .split(emojiFormat)
          .filter((emoji) => emoji !== "");

        const emojiLabels = {};

        const repeatedEmoji = [];
        const selectedCount = Math.min(emojis.length, textValues.length);

        for (let i = 0; i < textValues.length; i++) {
          const emojindex = i % selectedCount;
          repeatedEmoji.push(emojis[emojindex]);
        }

        for (let i = 0; i < textValues.length; i++) {
          emojiLabels[i] = repeatedEmoji[i];
        }

        return emojiLabels;
      };

      const emojiLabels = prepareEmojiLabels();

      if (option.value === "Horizontal") {
        button4.style.border = "block";
        button4.style.textAlign = "center";
        button.style.marginTop = "10px";
        button.style.alignItems = "center";
        button.style.height = "85%";
        button.style.width = "100%";
        button.style.display = "flex";
        button.style.flexDirection = "row";
        button.style.justifyContent = "center";
        button.style.position = "relative";
        button.style.marginLeft = "0px";
      }

      if (option.value === "Vertical") {
        button4.style.border = "none";
        button4.style.textAlign = "center";
        button.style.height = "auto";
        button.style.width = "50%";
        button.style.position = "absolute";
        button.style.display = "flex";
        button.style.flexDirection = "column";
        button.style.alignItems = "center";
        button.style.marginTop = "0";
        button.style.marginLeft = "26%";
      }

      if (
        idHolder.textContent === "scale Id" ||
        idHolder.textContent === "id"
      ) {
        setIsLoading(true);
        console.log("post req");
        Axios.post(
          "https://100035.pythonanywhere.com/nps-lite/api/nps-lite-settings",
          {
            user: "true",
            username: "NdoneAmbrose",
            orientation: option?.value,
            scalecolor: btnUpdateScale.value,
            fontcolor: btnUpdateFontColor.value,
            template_name: "temp202",
            no_of_scales: 6,
            time: timeId.style.display === "none" ? "00" : time?.value,
            name: beNametnUpdateScal.value,
            left: btnUpdateLeft.value,
            right: btnUpdateRight.value,
            center: btnUpdateCenter.value,
            fontstyle: btnUpdateScaleFont.value,
            fomat: selectedOption,
            custom_emoji_format: emojiLabels,
          }
        )
          .then((res) => {
            setIsLoading(false);
            sendMessage();
            setScaleData(res.data);
            const success = res.data.success;
            var successObj = JSON.parse(success);
            const id = successObj.inserted_id;
            console.log(id);
            if (id.length) {
              setScaleId(id && id);
              const idHolder = scale?.querySelector(".scaleId");
              idHolder.textContent = id && id;
            }
            console.log(res);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
      } else {
        setIsLoading(true);
        console.log("PUT req");
        console.log(idHolder.textContent);
        Axios.put(
          "https://100035.pythonanywhere.com/nps-lite/api/nps-lite-settings",
          {
            scale_id: idHolder.textContent,
            user: "true",
            username: "NdoneAmbrose",
            orientation: option?.value,
            scalecolor: btnUpdateScale.value,
            fontcolor: btnUpdateFontColor.value,
            template_name: "temp202",
            no_of_scales: 6,
            time: timeId.style.display === "none" ? "00" : time?.value,
            name: beNametnUpdateScal.value,
            left: btnUpdateLeft.value,
            right: btnUpdateRight.value,
            center: btnUpdateCenter.value,
            fontstyle: btnUpdateScaleFont.value,
            fomat: selectedOption,
            custom_emoji_format: emojiLabels,
          }
        )
          .then((res) => {
            if (res.status == 200) {
              setIsLoading(false);
              sendMessage();
              setScaleData(res.data);
              setScaleId(scaleId);
              console.log(res);
              console.log("This is the still scale", scale);
            }
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err.message);
          });
      }
    } else if (
      scaleType
        ? scaleType.value === "likert" || scaleTypeContent === "likert"
        : scaleTypeContent === "likert" ||
          scaleTypeHolder.textContent === "likert"
    ) {
      const scale = document.querySelector(".focussedd");
      console.log(scale);

      const btnUpdateScale = document.getElementById("scale_color_stapel");
      const btnUpdateFontColor = document.getElementById("font_color_likert");
      const btnUpdateButton = document.getElementById("button_color_likert");
      const beNametnUpdateScal = document.getElementById("scaleLabel_Likert");

      const btnUpdateLeft = document.getElementById("left");
      const btnUpdateRight = document.getElementById("right");
      const btnUpdateCenter = document.getElementById("centre");

      const buttonChildLeft = scale?.querySelector(".left_child");
      const buttonChildRight = scale?.querySelector(".right_child");
      const buttonChildNeutral = scale?.querySelector(".neutral_child");

      const button = scale?.querySelector(".label_hold");
      const scaleText = scale?.querySelector(".scale_text");
      const button4 = scale?.querySelector(".scool_input");
      const font = scale?.querySelector(".newScaleInput");

      const btnUpdateScaleFontLinkert =
        document.getElementById("font_style_likert");
      const option = document.querySelector("#orientationIdLinkert").options[
        document.querySelector("#orientationIdLinkert").selectedIndex
      ];
      let timeId = document.getElementById("timeId_likert");
      let time = document.getElementById("time_likert");
      let tempText = scale?.querySelector(".tempText");
      const labelHold = scale?.querySelector(".label_hold");
      // const labelScaleSelection = document.getElementById("labelScaleLinkert");
      // const optionSelect = document.getElementById("label_type_linkert");
      const likertNumberScale = document.getElementById("likert_no_scale");
      tempText?.remove();
      // Clear existing labels
      labelHold.innerHTML = "";

      if (btnUpdateLeft.value !== "") {
        buttonChildLeft.textContent = "";
      }
      if (btnUpdateCenter.value !== "") {
        buttonChildNeutral.textContent = "";
      }

      if (btnUpdateRight.value !== "") {
        buttonChildRight.textContent = "";
      }

      const numberOfScalesValue = Number(likertNumberScale.value);
      const labelTypeForPut = labelType === "Text" ? "text" : "emoji";
      const updatedLabelInput =
        labelType === "Text" ? labelTexts : selectedEmojis;
      const updatedLabels = labelType === "Text" ? labelTexts : selectedEmojis;
      const updatedLabelScale =
        labelType === "Text" ? Number(labelScale) : selectedEmojis.length;
      // Remove any previous circles from the labelHold
      labelHold.innerHTML = "";
      const numRows = Math.ceil(updatedLabelScale / 3);
      const numColumns = Math.min(updatedLabelScale, 3);

      const likertScaleArray = document.createElement("div");
      likertScaleArray.className = "likert_Scale_Array";
      likertScaleArray.textContent = updatedLabels;
      likertScaleArray.style.display = "none";
      labelHold.append(likertScaleArray);

      // // Update labelHold grid styles
      labelHold.style.display = "grid";
      labelHold.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
      labelHold.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
      // Update circles with new labels

      if (option.value === "Horizontal") {
        button4.style.border = "block";
        button4.style.textAlign = "center";
        button.style.display = "flex";
        button.style.flexDirection = "row";
        // button.style.marginTop = "5%";
        button.style.alignItems = "center";
        // buttonCircle.style.flexDirection = "row";
        button.style.height = "85%";
        button.style.width = "100%";
        button.style.flexDirection = "row";
        button.style.position = "relative";
        button.style.marginLeft = "0px";
        button.style.display = "grid";
        button.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
        button.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
      }

      if (option.value === "Vertical") {
        let orientation = document.createElement("h2");
        orientation.className = "orientation";
        orientation.textContent = "vertical";
        orientation.style.display = "none";
        button4.appendChild(orientation);
        button4.style.border = "none";
        button4.style.textAlign = "center";
        button.style.height = "80%";
        button.style.width = "50%";
        button.style.position = "absolute";
        button.style.display = "flex";
        button.style.flexDirection = "column";
        button.style.alignItems = "center";
        button.style.marginTop = "1%";
        button.style.marginLeft = "26%";
        // circle.style.gap = "20px";
      }

      if (
        idHolder.textContent === "scale Id" ||
        idHolder.textContent === "id"
      ) {
        setIsLoading(true);
        console.log("post req");
        Axios.post(
          "https://100035.pythonanywhere.com/likert/likert-scale_create/",
          {
            user: "yes",
            username: "TadesseJemal",
            orientation: option?.value,
            scale_name: beNametnUpdateScal.value,
            no_of_scales: numberOfScalesValue,
            font_color: btnUpdateFontColor.value,
            round_color: btnUpdateButton.value,
            label_type: labelTypeForPut,
            label_scale_selection: updatedLabelScale,
            label_scale_input: updatedLabelInput,
            custom_emoji_format: updatedLabelInput,
            time: timeId.style.display === "none" ? "00" : time?.value,
            fomat: labelTypeForPut,
          }
        )
          .then((res) => {
            setIsLoading(false);
            sendMessage();
            setScaleData(res.data);
            const success = res.data.success;
            var successObj = JSON.parse(success);
            const id = successObj.inserted_id;
            console.log(id);
            if (id.length) {
              setScaleId(id && id);
              const idHolder = scale?.querySelector(".scaleId");
              idHolder.textContent = id && id;
            }

            if (btnUpdateScale.value !== "") {
              button.style.backgroundColor = "white";
            }

            if (beNametnUpdateScal.value !== "") {
              scaleText.textContent = beNametnUpdateScal.value;
            }

            if (btnUpdateFontColor.value !== "") {
              button4.style.color = btnUpdateFontColor.value;
            }

            if (btnUpdateScaleFontLinkert.value !== "") {
              button4.style.fontFamily = btnUpdateScaleFontLinkert.value;
            }

            button4.style.display = "block";

            for (let i = 0; i < updatedLabelScale; i++) {
              const circle = document.createElement("div");
              circle.className = "circle_label";
              circle.style.width = "80%";
              circle.style.height = "55%";
              circle.style.borderRadius = "25px";
              circle.style.padding = "12px 20px";
              circle.style.backgroundColor = btnUpdateButton.value;
              circle.style.display = "flex";
              circle.style.justifyContent = "center";
              circle.style.alignItems = "center";
              circle.style.marginLeft = "5px";
              circle.style.marginRight = "5px";
              circle.addEventListener("mouseover", () => {
                circle.style.backgroundColor = "green"; // Change the color on hover
              });
              circle.addEventListener("mouseout", () => {
                circle.style.backgroundColor = btnUpdateButton.value; // Reset the color when not hovered
              });

              // Set the text content to the appropriate label (either text or emoji)
              circle.textContent = updatedLabels[i] || "";

              if (option.value === "Vertical") {
                circle.style.margin = "5px 0";
                circle.style.padding = "6px 12px";
              }

              labelHold.appendChild(circle);
            }
            console.log("This is the likert scale response", res.data.data);
            console.log("num scale", numberOfScalesValue)
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
      } else {
        setIsLoading(true);
        sendMessage();
        console.log("PUT req");
        console.log(idHolder.textContent);
        Axios.put(
          "https://100035.pythonanywhere.com/likert/likert-scale_create/",
          {
            scale_id: idHolder.textContent,
            user: "yes",
            username: "TadesseJemal",
            orientation: option?.value,
            scale_name: beNametnUpdateScal.value,
            no_of_scales: numberOfScalesValue,
            font_color: btnUpdateFontColor.value,
            round_color: btnUpdateButton.value,
            label_type: labelTypeForPut,
            label_scale_selection: updatedLabelScale,
            label_scale_input: updatedLabelInput,
            custom_emoji_format: updatedLabelInput,
            time: timeId.style.display === "none" ? "00" : time?.value,
            fomat: labelTypeForPut,
          }
        )
          .then((res) => {
            if (res.status == 200) {
              setIsLoading(false);
              sendMessage();
              setScaleData(res.data);
              setScaleId(scaleId);
              console.log(res);
              console.log("This is the still scale", scale);

              if (btnUpdateScale.value !== "") {
                button.style.backgroundColor = "white";
              }

              if (beNametnUpdateScal.value !== "") {
                scaleText.textContent = beNametnUpdateScal.value;
              }

              if (btnUpdateFontColor.value !== "") {
                button4.style.color = btnUpdateFontColor.value;
              }

              if (btnUpdateScaleFontLinkert.value !== "") {
                button4.style.fontFamily = btnUpdateScaleFontLinkert.value;
              }

              button4.style.display = "block";

              for (let i = 0; i < updatedLabelScale; i++) {
                const circle = document.createElement("div");
                circle.className = "circle_label";
                circle.style.width = "80%";
                circle.style.height = "55%";
                circle.style.borderRadius = "25px";
                circle.style.padding = "12px 20px";
                circle.style.backgroundColor = btnUpdateButton.value;
                circle.style.display = "flex";
                circle.style.justifyContent = "center";
                circle.style.alignItems = "center";
                circle.style.marginLeft = "5px";
                circle.style.marginRight = "5px";
                circle.addEventListener("mouseover", () => {
                  circle.style.backgroundColor = "green"; // Change the color on hover
                });
                circle.addEventListener("mouseout", () => {
                  circle.style.backgroundColor = btnUpdateButton.value; // Reset the color when not hovered
                });

                // Set the text content to the appropriate label (either text or emoji)
                circle.textContent = updatedLabels[i] || "";

                if (option.value === "Vertical") {
                  circle.style.margin = "5px 0";
                  circle.style.padding = "6px 12px";
                }

                labelHold.appendChild(circle);
              }
            }
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err.message);
          });
      }
    } else if (
      scaleType
        ? scaleType.value === "percent_scale" ||
          scaleTypeContent === "percent_scale"
        : scaleTypeContent === "percent_scale" ||
          scaleTypeHolder.textContent === "percent_scale"
    ) {
      const scale = document.querySelector(".focussedd");
      const btnUpdateScale = document.getElementById(
        "slider_color_percent_scale"
      );
      const btnUpdateFontColor = document.getElementById("font_color_percent");
      const btnUpdateScaleFont = document.getElementById("font_style_percent");
      const beNametnUpdateScal = document.getElementById("scale_label_percent");

      const button = scale?.querySelector(".label_hold");
      const scaleText = scale?.querySelector(".scale_text");
      const button4 = scale?.querySelector(".scool_input");

      button4.style.display = "block";
      const buttonChildLeft = scale?.querySelector(".left_child");
      const buttonChildRight = scale?.querySelector(".right_child");
      const buttonChildNeutral = scale?.querySelector(".neutral_child");

      const option = document.querySelector("#orientationId_percent").options[
        document.querySelector("#orientationId_percent").selectedIndex
      ];

      let time = document.getElementById("time_percent");

      let labelHold = scale?.querySelector(".label_hold");

      setTimeout(() => {
        labelHold.style.flexDirection = "column";
      }, 50);
      let tempText = scale?.querySelector(".tempText");
      tempText?.remove();

      if (beNametnUpdateScal.value !== "") {
        scaleText.textContent = beNametnUpdateScal.value;
      }

      if (btnUpdateFontColor.value !== "") {
        button4.style.color = btnUpdateFontColor.value;
      }
      if (btnUpdateScaleFont.value !== "") {
        button4.style.fontFamily = btnUpdateScaleFont.value;
      }

      buttonChildLeft.textContent = "";
      buttonChildNeutral.textContent = "";
      buttonChildRight.textContent = "";

      const existingLabelHolds = scale?.querySelectorAll(".label_hold");
      existingLabelHolds.forEach((label) => {
        label.remove();
      });

      const product_percent_scale = document.getElementById(
        "product_percent_scale"
      ).value;

      const containerDiv = document.createElement("div");
      containerDiv.className = "containerDIV";

      for (let i = 0; i < product_percent_scale; i++) {
        let newLabelHold = labelHold.cloneNode(true);
        newLabelHold.innerHTML = "";
        newLabelHold.style = "";

        newLabelHold.style.padding = "3px";
        newLabelHold.style.borderBottom = "1px solid gray";

        newLabelHold.style.paddingRight = "35px";
        newLabelHold.style.paddingLeft = "35px";
        newLabelHold.style.borderBottom = "1px solid gray";
        newLabelHold.style.borderTop = "1px solid gray";

        let product_names = document.getElementById("product_name");
        console.log(product_names.length);
        let inputFields = product_names?.querySelectorAll("input");
        console.log(inputFields);

        let nameDiv = document.createElement("div");
        nameDiv.className = "product_name";
        nameDiv.style.textAlign = "center";
        nameDiv.style.fontWeight = "700";
        nameDiv.textContent = inputFields[i]?.value;

        newLabelHold.insertBefore(nameDiv, newLabelHold.firstChild);
        let inputPercent = document.createElement("input");
        inputPercent.type = "range";
        inputPercent.min = "0";
        inputPercent.value = "50";
        inputPercent.max = "100";
        inputPercent.className = "percent-slider";
        inputPercent.disabled = "true";
        inputPercent.style.width = "100%";
        inputPercent.style.cursor = "pointer";
        inputPercent.style.background = btnUpdateScale.value;
        inputPercent.style.webkitAppearance = "none";
        inputPercent.style.borderRadius = "10px";

        newLabelHold.appendChild(inputPercent);

        let percentChilds = document.createElement("div");
        percentChilds.style.display = "flex";
        percentChilds.style.width = "100%";
        percentChilds.style.alignItems = "center";
        percentChilds.style.justifyContent = "space-between";

        let leftPercent = document.createElement("div");
        leftPercent.textContent = "0";
        leftPercent.className = "left-percent";
        percentChilds.appendChild(leftPercent);

        let centerPercent = document.createElement("div");
        inputPercent.addEventListener("input", () => {
          centerPercent.textContent = `${inputPercent.value}%`
            ? `${inputPercent.value}%`
            : "50%";
        });
        // centerPercent.textContent = `${inputPercent.value}%`;
        centerPercent.className = "center-percent";
        percentChilds.appendChild(centerPercent);

        let rightPercent = document.createElement("div");
        rightPercent.textContent = "100";
        rightPercent.className = "right-percent";
        percentChilds.appendChild(rightPercent);

        containerDiv.appendChild(newLabelHold);

        newLabelHold.appendChild(percentChilds);
        button4.appendChild(containerDiv);

        if (option.value === "Horizontal") {
          button4.style.border = "block";
          button4.style.textAlign = "center";
          button.style.marginTop = "10px";
          button.style.alignItems = "center";
          button.style.height = "85%";
          button.style.width = "100%";
          button.style.flexDirection = "row";
          button.style.position = "relative";
          button.style.marginLeft = "0px";
        }

        if (option.value === "Vertical") {
          let orientation = document.createElement("h2");
          orientation.className = "orientation";
          orientation.textContent = "vertical";
          orientation.style.display = "none";
          button4.appendChild(orientation);
          containerDiv.style.transform = "rotate(270deg)";
          nameDiv.style.position = "absolute";
          nameDiv.style.left = "93%";
          nameDiv.style.top = "7px";
          nameDiv.style.right = "-8px";
          nameDiv.style.transform = "rotate(90deg)";

          newLabelHold.style.position = "relative";
          newLabelHold.style.width = "80%";
          newLabelHold.style.paddingTop = "24px";
          percentChilds.style.alignItems = "start";
          percentChilds.style.height = "100%";
        }
        let productNames = [];
        for (let i = 0; i < inputFields.length; i++) {
          productNames.push(inputFields[i].value);
        }
        console.log(productNames);

        if (
          idHolder.textContent === "scale Id" ||
          idHolder.textContent === "id"
        ) {
          setIsLoading(true);
          console.log("post req");
          Axios.post(
            "https://100035.pythonanywhere.com/percent/api/percent_settings_create/",
            {
              username: "pfactorial",
              time: time.value,
              scale_name: beNametnUpdateScal.value,
              no_of_scale: 1,
              orientation: option.value,
              scale_color: btnUpdateScale.value,
              product_count: product_percent_scale,
              product_names: productNames,
              user: "yes",
            }
          )
            .then((res) => {
              setIsLoading(false);
              sendMessage();
              setScaleData(res.data);
              const success = res.data.success;
              var successObj = JSON.parse(success);
              const id = successObj.inserted_id;
              console.log(id);
              if (id.length) {
                setScaleId(id && id);
                const idHolder = scale?.querySelector(".scaleId");
                idHolder.textContent = id && id;
              }
              console.log(res);
            })
            .catch((err) => {
              setIsLoading(false);
              console.log(err);
            });
        } else {
          setIsLoading(true);
          console.log("PUT req");
          console.log(idHolder.textContent);
          Axios.put(
            "https://100035.pythonanywhere.com/percent/api/percent_settings_create/",
            {
              scale_id: idHolder.textContent,
              username: "pfactorial",
              time: time.value,
              scale_name: beNametnUpdateScal.value,
              no_of_scale: 1,
              orientation: option.value,
              scale_color: btnUpdateScale.value,
              product_count: product_percent_scale,
              product_names: productNames,
              user: "yes",
            }
          )
            .then((res) => {
              if (res.status == 200) {
                setIsLoading(false);
                sendMessage();
                setScaleData(res.data);
                setScaleId(scaleId);
                console.log(res);
                console.log("This is the still scale", scale);
              }
            })
            .catch((err) => {
              setIsLoading(false);
              console.log(err.message);
            });
        }
      }
    } else if (
      scaleType
        ? scaleType.value === "percent_sum_scale" ||
          scaleTypeContent === "percent_sum_scale"
        : scaleTypeContent === "percent_sum_scale" ||
          scaleTypeHolder.textContent === "percent_sum_scale"
    ) {
      const scale = document.querySelector(".focussedd");
      const btnUpdateScale = document.getElementById(
        "slider_color_percent_sum_scale"
      );
      const btnUpdateFontColor = document.getElementById("font_color_percent_sum");
      const btnUpdateScaleFont = document.getElementById("font_style_percent_sum");
      const beNametnUpdateScal = document.getElementById("scale_label_percent_sum");

      const button = scale?.querySelector(".label_hold");
      const scaleText = scale?.querySelector(".scale_text");
      const button4 = scale?.querySelector(".scool_input");

      button4.style.display = "block";
      const buttonChildLeft = scale?.querySelector(".left_child");
      const buttonChildRight = scale?.querySelector(".right_child");
      const buttonChildNeutral = scale?.querySelector(".neutral_child");

      const option = document.querySelector("#orientationId_percent_sum").options[
        document.querySelector("#orientationId_percent_sum").selectedIndex
      ];

      let time = document.getElementById("time_percent_sum");

      let labelHold = scale?.querySelector(".label_hold");

      setTimeout(() => {
        labelHold.style.flexDirection = "column";
      }, 50);
      let tempText = scale?.querySelector(".tempText");
      tempText?.remove();

      if (beNametnUpdateScal.value !== "") {
        scaleText.textContent = beNametnUpdateScal.value;
      }

      if (btnUpdateFontColor.value !== "") {
        button4.style.color = btnUpdateFontColor.value;
      }
      if (btnUpdateScaleFont.value !== "") {
        button4.style.fontFamily = btnUpdateScaleFont.value;
      }

      buttonChildLeft.textContent = "";
      buttonChildNeutral.textContent = "";
      buttonChildRight.textContent = "";

      const existingLabelHolds = scale?.querySelectorAll(".label_hold");
      existingLabelHolds.forEach((label) => {
        label.remove();
      });
    
      const percentSumProductCount = document.getElementById(
        "percent_sum_product_count"
      ).value;

      const containerDiv = document.createElement("div");
      containerDiv.className = "containerDIV";

      const orientation = document.createElement("div");
      orientation.className = "orientation";
      orientation.textContent = option.value;
      orientation.style.display = "none";
      button4.appendChild(orientation);

      for (let i = 0; i < Number(percentSumProductCount); i++) {
        let newLabelHold = labelHold.cloneNode(true);
        newLabelHold.innerHTML = "";
        newLabelHold.style = "";

        newLabelHold.style.padding = "3px";
        newLabelHold.style.borderBottom = "1px solid gray";

        newLabelHold.style.paddingRight = "35px";
        newLabelHold.style.paddingLeft = "35px";
        newLabelHold.style.borderBottom = "1px solid gray";
        newLabelHold.style.borderTop = "1px solid gray";

        let productNames = document.getElementById("product_count_label");
        let inputFields = productNames?.querySelectorAll("input");

        let nameDiv = document.createElement("div");
        nameDiv.className = "product_name";
        nameDiv.style.textAlign = "center";
        nameDiv.style.fontWeight = "700";
        nameDiv.textContent = inputFields[i]?.value;
        newLabelHold.insertBefore(nameDiv, newLabelHold.firstChild);
        
        let inputPercent = document.createElement("input");
        inputPercent.type = "range";
        inputPercent.disabled = "true";
        inputPercent.min = "0";
        inputPercent.value = "50";
        inputPercent.max = "100";
        inputPercent.className = "percent-slider";
        inputPercent.style.width = "100%";
        inputPercent.style.cursor = "pointer";
        inputPercent.style.background = btnUpdateScale.value;
        inputPercent.style.webkitAppearance = "none";
        inputPercent.style.borderRadius = "10px";
        newLabelHold.appendChild(inputPercent);

        let percentChilds = document.createElement("div");
        percentChilds.style.display = "flex";
        percentChilds.style.width = "100%";
        percentChilds.style.alignItems = "center";
        percentChilds.style.justifyContent = "space-between";

        let leftPercent = document.createElement("div");
        leftPercent.textContent = "0";
        leftPercent.className = "left-percent";
        percentChilds.appendChild(leftPercent);

        let centerPercent = document.createElement("div");
        inputPercent.addEventListener("input", () => {
          centerPercent.textContent = `${inputPercent.value}%`
            ? `${inputPercent.value}%`
            : "50%";
        });
        centerPercent.className = "center-percent";
        percentChilds.appendChild(centerPercent);

        let rightPercent = document.createElement("div");
        rightPercent.textContent = "100";
        rightPercent.className = "right-percent";
        percentChilds.appendChild(rightPercent);
 
        containerDiv.appendChild(newLabelHold);

        newLabelHold.appendChild(percentChilds);
        button4.appendChild(containerDiv);

        if (option.value === "Horizontal") {
          button4.style.border = "block";
          button4.style.textAlign = "center";
          button.style.marginTop = "10px";
          button.style.alignItems = "center";
          button.style.height = "85%";
          button.style.width = "100%";
          button.style.flexDirection = "row";
          button.style.position = "relative";
          button.style.marginLeft = "0px";
        }

        if (option.value === "Vertical") {
          containerDiv.style.transform = "rotate(270deg)";
          // containerDiv.style.marginLeft = "30px";
          containerDiv.style.marginTop = "80px";
          containerDiv.style.width = "100%";

          inputPercent.style.marginTop = "20px";

          nameDiv.style.position = "absolute";
          nameDiv.style.left = "93%";
          nameDiv.style.top = "7px";
          nameDiv.style.right = "-8px";
          nameDiv.style.transform = "rotate(90deg)";
          nameDiv.style.paddingLeft = "8px";

          newLabelHold.style.position = "relative";
          newLabelHold.style.width = "85%";

          percentChilds.style.alignItems = "start";
          percentChilds.style.height = "100%";

          if (inputFields.length == 5 ) {
            scaleText.style.marginBottom = "-100px";
          }


          if (inputFields.length == 6 ) {
            scaleText.style.marginBottom = "-31px";
          }

          if (inputFields.length == 7 ) {
            scaleText.style.marginBottom = "-62px";
          }

          if (inputFields.length == 8 ) {
            scaleText.style.marginBottom = "-80px";
          }

          if (inputFields.length == 9 ) {
            scaleText.style.marginBottom = "-117px";
          }

          if (inputFields.length == 10 ) {
            scaleText.style.marginBottom = "-151px";
          }
        }

        let productNameLabels = [];
        for (let i = 0; i < inputFields.length; i++) {
          productNameLabels.push(inputFields[i].value);
        }

        if (
          idHolder.textContent === "scale Id" ||
          idHolder.textContent === "id"
        ) {
          setIsLoading(true);
          console.log("post req");
          Axios.post(
            "https://100035.pythonanywhere.com/percent-sum/percent-sum-settings",
            {
              username: "pfactorial",
              time: time.value,
              scale_name: beNametnUpdateScal.value,
              no_of_scale: 1,
              orientation: option.value,
              scale_color: btnUpdateScale.value,
              product_count: Number(percentSumProductCount),
              product_names: productNameLabels,
              user: "yes",
            }
          )
            .then((res) => {
              setIsLoading(false);
              sendMessage();
              setScaleData(res.data);
              const success = res.data.success;
              var successObj = JSON.parse(success);
              const id = successObj.inserted_id;
              console.log(id);
              if (id.length) {
                setScaleId(id && id);
                const idHolder = scale?.querySelector(".scaleId");
                idHolder.textContent = id && id;
              }
              console.log(res);
            })
            .catch((err) => {
              setIsLoading(false);
              console.log(err);
            });
        } else {
          setIsLoading(true);
          console.log("PUT req");
          console.log(idHolder.textContent);
          Axios.put(
            "https://100035.pythonanywhere.com/percent-sum/percent-sum-settings",
            {
              scale_id: idHolder.textContent,
              username: "pfactorial",
              time: time.value,
              scale_name: beNametnUpdateScal.value,
              no_of_scale: 1,
              orientation: option.value,
              scale_color: btnUpdateScale.value,
              product_count: Number(percentSumProductCount),
              product_names: productNameLabels,
              user: "yes",
            }
          )
            .then((res) => {
              if (res.status == 200) {
                setIsLoading(false);
                sendMessage();
                setScaleData(res.data);
                setScaleId(scaleId);
                console.log(res);
                console.log("This is the still scale", scale);
              }
            })
            .catch((err) => {
              setIsLoading(false);
              console.log(err.message);
            });
        }
      }
    }
  };
  const idHolder = scale?.querySelector(".scaleId");
  console.log(idHolder);
  console.log(scaleId);
  function showIframe() {
    const divIframeRight = document.getElementById("iframeRight");
    const divSettingRight = document.getElementById("settingRight");
    const updateScale = document.getElementById("updateScale");
    const setScale = document.getElementById("setScale");
    divIframeRight.style.display = "block";
    updateScale.style.borderBottom = "2px solid lightgreen";
    setScale.style.border = "none";
    divSettingRight.style.display = "none";
    const border = document.getElementById("border");
    border.style.display = "none";
  }

  function showSetting() {
    const divIframeRight = document.getElementById("iframeRight");
    const divSettingRight = document.getElementById("settingRight");
    const setScale = document.getElementById("setScale");
    const updateScale = document.getElementById("updateScale");

    divIframeRight.style.display = "none";
    updateScale.style.border = "none";
    setScale.style.borderBottom = "2px solid lightgreen";
    divSettingRight.style.display = "block";
    const border = document.getElementById("border");
    border.style.display = "block";
  }

  const showSingle = () => {
    const divSingleRight = document.getElementById("singleScale");
    const divMultiRight = document.getElementById("multiScale");
    const divInVisible = document.getElementById("invisible");
    divSingleRight.style.display = "block";
    divMultiRight.style.display = "none";
    divInVisible.style.display = "block";
    divSingleRight.style.marginTop = "10px";
  };

  const showMulti = () => {
    const divSingleRight = document.getElementById("singleScale");
    const divMultiRight = document.getElementById("multiScale");
    const divInVisible = document.getElementById("invisible");
    divSingleRight.style.display = "none";
    divMultiRight.style.display = "block";
    divInVisible.style.display = "block";
    divMultiRight.style.marginTop = "10px";
  };

  // const iframeSrc = `https://100035.pythonanywhere.com/nps-editor/settings/${scaleId}`;
  // console.log(iframeSrc, "iframeSrc");

  function removeScale() {
    const focusseddElmnt = document.querySelector(".focussedd");
    if (focusseddElmnt.classList.contains("holderDIV")) {
      document.querySelector(".focussedd").remove();
    }
  }
  const myArray = Object.values(data)[0];
  // console.log(myArray);
  function excludeElementsWithAttributeValue(arr, attribute, valueToExclude) {
    return arr?.filter(function (element) {
      // console.log(element);
      // console.log(attribute);
      // console.log(valueToExclude);
      // console.log(arr);
      return (
        element.hasOwnProperty(attribute) &&
        element[attribute] !== valueToExclude
      );
    });
  }

  var newArray = excludeElementsWithAttributeValue(
    myArray,
    "type",
    "NEW_SCALE_INPUT"
  );
  // console.log(newArray);

  const filteredArray = newArray?.filter((obj) => !customId.includes(obj.id));
  // console.log(filteredArray);

  const elems = document.getElementsByClassName("holderDIV");
  for (let index = 0; index < elems.length; index++) {
    const element = elems[index];
    // console.log(element.children[0]);
  }

  const handleSelect = (event) => {
    let selectField = document.getElementById("select1");
    var selectedValues = {};
    const options = selectField.options;

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.selected) {
        selectedValues[option.value] = option.id;
        console.log(option);
      }
    }

    console.log(selectedValues);
    setSelectedOptions(selectedValues);

    let selectedOption = selectField.options[selectField.selectedIndex];
    let selectedElementId = selectedOption.id;
    console.log(selectedElementId, "selectedElementId");

    const selectedElements = myArray.find(
      (element) => element.id === selectedElementId
    );
    console.log(selectedElements, "selectedElement");

    let divElement = document.getElementById(selectedElements.id);
    console.log(divElement.id, "divElement");

    // Remove the green border from the previously selected option
    let previousOptionId = selectField.getAttribute("data-prev-option");
    if (previousOptionId) {
      let previousOptionDiv = document.getElementById(previousOptionId);
      previousOptionDiv.parentElement.style.border = "none";
    }

    // Add the green border to the currently selected option
    divElement.parentElement.style.border = "2px solid green";

    divElement.focus();

    // Store the ID of the currently selected option as the previous option
    selectField.setAttribute("data-prev-option", selectedElements.id);
  };

  const options = newArray?.map((element, index) => (
    <option key={index} value={element.type} id={element.id}>
      {`${element.type} ${element.id}`}
    </option>
  ));

  const handleBorderSizeChange = (e) => {
    setBorderSize(e.target.value);

    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderWidth = `${borderSize}px`;
  };

  const handleBorderColorChange = (e) => {
    setBorderColor(e.target.value);
    const box = document.getElementsByClassName("focussedd")[0];
    box.style.borderColor = `${borderColor}`;
  };
  const handleRangeBlur = (e) => {
    e.target.focus();
  };
  const refreshIframe = () => {
    var container = document.getElementById("settingSelect");
    var content = container.innerHTML;
    container.innerHTML = content;
  };

  const onScoreChange = (e) => {
    let scoreId = document.getElementById("scoreInput");
    if (e.target.checked) {
      scoreId.style.display = "flex";
    } else {
      scoreId.style.display = "none";
    }
  };

  const onTimeChange = (e) => {
    let timeId = document.getElementById("timeId");
    if (e.target.checked) {
      timeId.style.display = "flex";
    } else {
      timeId.style.display = "none";
    }
  };

  const onTimeChangeStapel = (e) => {
    let timeId = document.getElementById("timeId_stapel");
    if (e.target.checked) {
      timeId.style.display = "flex";
    } else {
      timeId.style.display = "none";
    }
  };

  const onTimeChangeNpsLite = (e) => {
    let timeId = document.getElementById("timeId_nps_lite");
    if (e.target.checked) {
      timeId.style.display = "flex";
    } else {
      timeId.style.display = "none";
    }
  };

  const onTimeChangeLikert = (e) => {
    let timeId = document.getElementById("timeId_likert");
    if (e.target.checked) {
      timeId.style.display = "flex";
    } else {
      timeId.style.display = "none";
    }
  };

  const onTimeChangePercent = (e) => {
    let timeId = document.getElementById("timeId_percent");
    if (e.target.checked) {
      timeId.style.display = "flex";
    } else {
      timeId.style.display = "none";
    }
  };

  const onTimeChangePercentSum = (e) => {
    let timeId = document.getElementById("timeId_percent_sum");
    if (e.target.checked) {
      timeId.style.display = "flex";
    } else {
      timeId.style.display = "none";
    }
  };

  // const upperVal = Math.min(10, parseInt(document.getElementById('upperVal').value, 10));
  // if (upperVal !==null) {
  //   const upperVal = Math.min(10, parseInt(document.getElementById('upperVal').value, 10));
  //   return (
  //     upperVal
  //   );
  // };

  return (
    <>
      {decoded.details.action === "document" ? (
        <>
          <div
            style={{
              width: "100%",
              display: "flex",
              // borderRadius: "20px",
              // backgroundColor: "red",
            }}
          >
            <button
              style={{
                width: "100%",
                border: "none",
                fontWeight: "600",
              }}
              id="updateScale"
              className="py-2 bg-white border-none"
              // style={{"}}
              // onClick={showIframe}
            >
              Appearance
            </button>
            <button
              style={{
                width: "100%",
                border: "none",
                fontWeight: "600",
              }}
              id="setScale"
              className="py-2 bg-white border-none"
              // style={{ bordern: "none", outline: "none" }}
              // onClick={showSetting}
            >
              Configurations
            </button>
          </div>
          <div id="iframeRight">
            <div className="mb-4"></div>
          </div>
          {showBorder === true ? (
            <>
              <hr />
              <Row className="pt-4">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h6 style={{ marginRight: "10rem" }}>Border</h6>
                  <label className="switch">
                    <input
                      type="checkbox"
                      onClick={() => setShowSlider(!showSlider)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                {showSlider && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#abab",
                      gap: "10px",
                      height: "40px",
                      width: "90%",
                    }}
                  >
                    <input
                      type="color"
                      value={borderColor}
                      onChange={handleBorderColorChange}
                      id="color"
                      style={{ border: "none", width: "10%", height: "15px" }}
                    />
                    <input
                      type="range"
                      min="-10"
                      max="20"
                      value={borderSize}
                      onChange={handleBorderSizeChange}
                      id="range"
                      className="range-color"
                    />
                  </div>
                )}
              </Row>
              <hr />
            </>
          ) : (
            ""
          )}
          <div id="settingRight" style={{ display: "none" }}>
            {/* iframe */}
            <div>
              {/* <Form.Control
            type="text"
            placeholder={`${decoded.details._id}_scl1`}
            disabled
            className="mb-4"
          // id="iframe_src"
          // onChange={handleChange}
          /> */}
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              width: "100%",
              display: "flex",
            }}
          >
            <button
              style={{
                width: "100%",
                border: "none",
                fontWeight: "600",
              }}
              id="updateScale"
              className="py-2 bg-white border-none"
              // style={{"}}
              onClick={showIframe}
            >
              Appearance
            </button>
            <button
              style={{
                width: "100%",
                border: "none",
                fontWeight: "600",
              }}
              id="setScale"
              className="py-2 bg-white border-none"
              // style={{ bordern: "none", outline: "none" }}
              onClick={showSetting}
            >
              Configurations
            </button>
          </div>

          <div
            style={{
              width: "100%",
              overflowY: "auto",
              paddingTop: "5px",
              paddingBottom: "5px",
              paddingLeft: "12px",
              paddingRight: "12px",
              marginTop: "15px",
              fontSize: "10px",
            }}
            id="iframeRight"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                width: "100%",
                paddingLeft: "12px",
              }}
            >
              <div>
                {scaleTypeHolder?.textContent === "" &&
                scaleTypeContent === "" ? (
                  <div>
                    <div
                      style={{
                        padding: "3px 7px",
                        borderRadius: "7px",
                        // height: "30px",
                        width: "100%",
                        // alignItems: "center",
                        fontWeight: "600",
                        fontSize: "16px",
                        marginLeft: "0",
                      }}
                    >
                      <div>
                        <select
                          id="scaleType"
                          onChange={handleFormatChange}
                          // onChange={handleDateMethod}
                          className="select border-0 bg-white rounded w-100 h-75 p-2"
                          //multiple
                          style={{ marginBottom: "6px", width: "100%" }}
                        >
                          <option>Select Scale</option>
                          <option value="snipte">Stapel Scale</option>
                          <option value="nps">Nps Scale</option>
                          <option value="nps_lite">Nps Lite Scale</option>
                          <option value="likert">Likert Scale</option>
                          <option value="percent_scale">Percent Scale</option>
                          <option value="percent_sum_scale">Percent-Sum Scale</option>
                        </select>
                      </div>
                      {/* <select
                        style={{
                          width: "180px",
                          height: "35px",
                          display: "flex",
                          justifyContent: "center",
                          gap: "5rem",
                          backgroundColor: "transparent",
                          outline: "none",
                          border: "none",
                          fontWeight: "600",
                        }}
                       
                      >
                        
                      </select> */}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div id="npsScaleForm">
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "15px",
                  width: "100%",
                  overflowY: "auto",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  marginTop: "15px",
                  fontSize: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    margin: "0",
                    padding: "0",
                    flexDirection: "column",
                    // gap: "5px",
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <h1
                      id="headerText"
                      style={{ margin: "auto 0", fontSize: "15px" }}
                    >
                      Edit {scaleTitle}
                    </h1>
                  </div>
                  <h6 style={{ fontSize: "12px" }}>Orientation</h6>
                  <div
                    style={{
                      backgroundColor: "#e8e8e8",
                      // padding: "5px 10px",
                      borderRadius: "10px",
                      padding: "5px 7px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <select
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        // borderRadius: "10px",
                        // padding: "3px 10px",
                        height: "15px",
                        border: "none",
                        justifyContent: "center",
                        outline: "none",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "12px",
                        margin: "0 auto",
                      }}
                      className="bg-gray-800"
                      id="orientationId"
                    >
                      <option value="Horizontal" style={{ color: "black" }}>
                        Horizontal
                      </option>
                      <option value="Vertical" style={{ color: "black" }}>
                        Vertical
                      </option>
                    </select>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "space-between",
                    gap: "10px",
                    marginTop: "10px",
                    // alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Scale Color
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="color"
                          style={{
                            width: "100px",
                            height: "12px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          // defaultValue={
                          //   scaleDisplay.style.display !== "none" ? scaleBg : ""
                          // }
                          // defaultValue={
                          //   // !scaleDisplay ? undefined ? scaleDisplay="none" ? undefined : scaleBg
                          //   !scaleDisplay
                          //     ? undefined
                          //     : scaleDisplay === "none"
                          //     ? undefined
                          //     : scaleBg
                          // }
                          // defaultValue={scale && scaleBg}
                          // defaultValue={
                          //   document
                          //     ?.querySelector(".focussedd")
                          //     ?.querySelector(".label_hold")?.style?.backgroundColor
                          // }
                          id="scale_color"
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Button Color
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="color"
                          style={{
                            width: "100px",
                            height: "12px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          // defaultValue={
                          //   // scaleDisplay.style?.display !== "none" ? circles : ""
                          //   // scaleDisplay?.style?.display ? scaleDisplay.style.display ==="block" ? circles : ""
                          // }
                          // defaultValue={
                          //   scaleDisplay.style.display === "none"
                          //     ? undefined
                          //     : circles
                          // }
                          // defaultValue={
                          //   // !scaleDisplay ? undefined ? scaleDisplay="none" ? undefined : scaleBg
                          //   !scaleDisplay
                          //     ? undefined
                          //     : scaleDisplay === "none"
                          //     ? undefined
                          //     : circles
                          // }
                          // defaultValue={circles ? circles : ""}
                          id="button_color"
                        />
                        {/* <BiChevronDown
                    size={20}
                    ref={ref}
                    style={{ fontSize: "12px", width: "4px" }}
                  /> */}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Font Color
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="color"
                          style={{
                            width: "100px",
                            height: "12px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          // defaultValue={
                          //   // !scaleDisplay ? undefined ? scaleDisplay="none" ? undefined : scaleBg
                          //   !scaleDisplay
                          //     ? undefined
                          //     : scaleDisplay === "none"
                          //     ? undefined
                          //     : fontColor
                          // }
                          // defaultValue={
                          //   scaleDisplay.style.display === "none"
                          //     ? undefined
                          //     : fontColor
                          // }
                          // defaultValue={
                          //   scaleDisplay.style.display !== "none" ? fontColor : ""
                          // }
                          // defaultValue={fontColor ? fontColor : ""}
                          id="font_color"
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Font Style
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "3px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <select
                          style={{
                            width: "100px",
                            height: "15px",
                            display: "flex",
                            backgroundColor: "transparent",
                            outline: "none",
                            border: "none",
                            alignItems: "center",
                          }}
                          id="font_style"
                          defaultValue={
                            // !scaleDisplay ? undefined ? scaleDisplay="none" ? undefined : scaleBg
                            fontFamlity
                              ? fontFamlity.style.fontFamily
                              : "Select"
                          }
                        >
                          <option style={{ fontSize: "11px" }}>Select</option>
                          {fontStyles.map((fontStyle, index) => (
                            <option key={index} value={fontStyle}>
                              {fontStyle}
                            </option>
                          ))}
                        </select>
                        {/* <BiChevronDown
                    size={20}
                    ref={ref}
                    style={{ fontSize: "12px", width: "4px" }}
                  /> */}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Format
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "3px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <select
                          style={{
                            width: "70px",
                            height: "15px",
                            display: "flex",
                            backgroundColor: "transparent",
                            outline: "none",
                            border: "none",
                            alignItems: "center",
                          }}
                          id="format"
                          onChange={handleFormat}
                        >
                          <option value="number">Number</option>
                          {/* <option value="image">Image</option> */}
                          <option value="emoji">Emoji</option>
                        </select>
                        {/* <BiChevronDown
                    size={20}
                    ref={ref}
                    style={{ fontSize: "12px", width: "4px" }}
                  /> */}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "none",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                      id="emoji"
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Select Emoji
                      </h6>
                      <div
                        style={{
                          position: "relative",
                          backgroundColor: "#e8e8e8",
                          padding: "3px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          style={{
                            width: "100px",
                            height: "15px",
                            display: "flex",
                            backgroundColor: "transparent",
                            outline: "none",
                            border: "none",
                            alignItems: "center",
                          }}
                          id="emojiInp"
                          value={inputStr}
                          onChange={(e) => setInputStr(e.target.value)}
                        />

                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "-140px",
                            zIndex: 1,
                            maxWidth: "250px",
                            maxHeight: "300px",
                            overflowY: "auto",
                            padding: "5px",
                          }}
                        >
                          {showPicker && <Picker onEmojiClick={onEmojiClick} />}
                        </div>
                        <GrEmoji
                          style={{
                            position: "absolute",
                            zIndex: "1",
                            backgroundColor: "#e8e8e8",
                            right: "-14px",
                            // top: "1px",
                          }}
                          onClick={() =>
                            inputStr.length === 22
                              ? ""
                              : setShowPicker(!showPicker)
                          }
                        />
                      </div>
                      {inputStr.length < 22 || inputStr.length > 22 ? (
                        <p style={{ fontSize: "small", color: "red" }}>
                          select 11 emojis
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      style={{
                        display: "none",
                        flexDirection: "column",
                        gap: "1px",
                      }}
                      id="image"
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "10px" }}>
                        Upload Image
                      </h6>
                      <div
                        style={{
                          position: "relative",
                          // backgroundColor: "#e8e8e8",
                          padding: "3px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          style={{
                            width: "100px",
                            // height: "18px",
                            display: "flex",
                            backgroundColor: "transparent",
                            outline: "none",
                            border: "none",
                            alignItems: "center",
                          }}
                          type="file"
                          onChange={handleImage}
                        />
                        {selectedImages.length > 0 && (
                          <div
                            style={{
                              // display: "flex",
                              // flexDirection: "row",
                              width: "100%",
                              gap: "2px",
                              padding: "5px",
                            }}
                            id="ImageUpload"
                          >
                            {selectedImages.map((imageData, index) => (
                              <img
                                key={index}
                                src={imageData}
                                alt={`Uploaded ${index}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Left
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="text"
                          // defaultValue={leftChild ? leftChild.innerHTML : ""}
                          // defaultValue={
                          //   scaleDisplay.style.display === "none"
                          //     ? ""
                          //     : leftChild.innerHTML
                          // }
                          // defaultValue={
                          //   // !scaleDisplay ? undefined ? scaleDisplay="none" ? undefined : scaleBg
                          //   leftChild ? leftChild.innerHTML : ""
                          // }
                          style={{
                            width: "100px",
                            height: "12px",
                            display: "flex",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            alignItems: "center",
                          }}
                          id="left"
                          disabled={
                            isEmojiFormat === true &&
                            (inputStr.length < 22 || inputStr.length > 22)
                              ? true
                              : false
                          }
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Centre
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "3px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="text"
                          style={{
                            width: "100px",
                            height: "15px",
                            display: "flex",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            alignItems: "center",
                          }}
                          // defaultValue={
                          //   // !scaleDisplay ? undefined ? scaleDisplay="none" ? undefined : scaleBg
                          //   neutralChild ? neutralChild.innerHTML : ""
                          // }
                          id="centre"
                          disabled={
                            isEmojiFormat === true &&
                            (inputStr.length < 22 || inputStr.length > 22)
                              ? true
                              : false
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Right
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "3px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="text"
                          style={{
                            width: "100%",
                            height: "15px",
                            display: "flex",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            alignItems: "center",
                          }}
                          // defaultValue={
                          //   // !scaleDisplay ? undefined ? scaleDisplay="none" ? undefined : scaleBg
                          //   rightChild ? rightChild.innerHTML : ""
                          // }
                          id="right"
                          disabled={
                            isEmojiFormat === true &&
                            (inputStr.length < 22 || inputStr.length > 22)
                              ? true
                              : false
                          }
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Scale label
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "3px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="text"
                          onChange={(e) => setScaleTitle(e.target.value)}
                          // defaultValue={leftChild ? leftChild.innerHTML : ""}
                          // defaultValue={
                          //   scaleDisplay.style.display === "none"
                          //     ? ""
                          //     : leftChild.innerHTML
                          // }
                          defaultValue={
                            // !scaleDisplay ? undefined ? scaleDisplay="none" ? undefined : scaleBg
                            scaleT ? scaleT.innerHTML : ""
                          }
                          style={{
                            width: "82px",
                            height: "15px",
                            display: "flex",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            alignItems: "center",
                          }}
                          id="scaleLabel"
                          disabled={
                            isEmojiFormat === true &&
                            (inputStr.length < 22 || inputStr.length > 22)
                              ? true
                              : false
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                      Number of scales
                    </h6>
                    <div
                      style={{
                        backgroundColor: "#e8e8e8",
                        padding: "3px 7px",
                        borderRadius: "7px",
                        // height: "30px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="1"
                        style={{
                          width: "100%",
                          height: "15px",
                          display: "flex",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          alignItems: "center",
                        }}
                        id="scales"
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      // gap: "2px",
                      alignItems: "center",
                      justifyContent: "space-between      ",
                    }}
                  >
                    <h6 style={{ fontSize: "12px" }}>Time(sec)</h6>

                    <div class="form-check form-switch">
                      <input
                        style={{ cursor: "pointer" }}
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        // onChange={(e) => setIsSwitchEnabled(e.target.checked)}
                        onChange={onTimeChange}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "none",
                      flexDirection: "column",
                      gap: "2px",
                      marginTop: "-10px",
                    }}
                    id="timeId"
                  >
                    <div
                      style={{
                        backgroundColor: "#e8e8e8",
                        padding: "3px 7px",
                        borderRadius: "7px",
                        // height: "30px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="1"
                        style={{
                          width: "100%",
                          height: "15px",
                          display: "flex",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          alignItems: "center",
                        }}
                        id="time"
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      // gap: "2px",
                      alignItems: "center",
                      justifyContent: "space-between      ",
                    }}
                  >
                    <h6 style={{ fontSize: "12px" }}>
                      Show total score for all instances
                    </h6>

                    <div class="form-check form-switch">
                      <input
                        style={{ cursor: "pointer" }}
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        // onChange={(e) => setScore(e.target.checked)}
                        onChange={onScoreChange}
                      />
                    </div>
                  </div>

                  {/* {score && ( */}
                  <div
                    style={{
                      display: "none",
                      flexDirection: "column",
                      gap: "2px",
                      marginTop: "-10px",
                    }}
                    id="scoreInput"
                  >
                    <div
                      style={{
                        backgroundColor: "#e8e8e8",
                        padding: "3px 7px",
                        borderRadius: "7px",
                        // height: "30px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="1"
                        style={{
                          width: "100%",
                          height: "15px",
                          display: "flex",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          alignItems: "center",
                        }}
                        id="score"
                      />
                    </div>
                  </div>
                  {/* // )} */}
                </div>
                <hr />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    padding: "0 5px",
                    gap: "10px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h6 style={{ fontSize: "13px" }}>Grouped Elements</h6>
                    <div
                      style={{ display: "flex", gap: "10px", padding: "5px" }}
                    >
                      <Button
                        id="updateSingleScale"
                        type="button"
                        variant="secondary"
                        onClick={showSingle}
                        style={{ fontSize: "13px" }}
                      >
                        Single Select
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={showMulti}
                        style={{ fontSize: "13px" }}
                      >
                        Multi Select
                      </Button>
                    </div>
                    <hr />
                    <div
                      style={{
                        backgroundColor: "#ffffff",
                        // padding: "10px 10px",
                        borderRadius: "10px",
                        // padding: "5px 7px",
                        width: "100%",
                        margin: "0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      className="shadow-sm p-3 bg-white rounded "
                    >
                      <select
                        style={{
                          width: "100%",
                          cursor: "pointer",
                          backgroundColor: "transparent",
                          // borderRadius: "10px",
                          // padding: "3px 10px",
                          // height: "15px",
                          border: "none",
                          justifyContent: "center",
                          outline: "none",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "12px",
                          margin: "0 auto",
                        }}
                        className="bg-gray-800"
                      >
                        <option style={{ color: "black" }}>
                          Nothing Selected
                        </option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h6 style={{ fontSize: "13px" }}>User Permissions</h6>
                    <div
                      style={{
                        backgroundColor: "#ffffff",
                        // padding: "10px 10px",
                        borderRadius: "10px",
                        // padding: "2px 0",

                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      className="shadow-sm p-3 bg-white rounded"
                    >
                      <select
                        style={{
                          width: "100%",
                          cursor: "pointer",
                          backgroundColor: "transparent",
                          // borderRadius: "10px",
                          // padding: "3px 10px",
                          // height: "15px",
                          border: "none",
                          justifyContent: "center",
                          outline: "none",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "12px",
                          margin: "0 auto",
                        }}
                        className="bg-gray-800"
                      >
                        <option style={{ color: "black" }}>
                          Nothing Selected
                        </option>
                      </select>
                    </div>

                    <br />
                    <SelectAnsAndQuestion
                      selectedType={selectedType}
                      setSelectedType={setSelectedType}
                      setAddedAns={setAddedAns}
                      addedAns={addedAns}
                    />
                    <br />

                    <div>
                      <Button
                        id="button_id"
                        type="button"
                        width="50%"
                        marginTop="60px"
                        onClick={handleUpdates}
                        disabled={
                          isEmojiFormat === true &&
                          (inputStr.length < 22 || inputStr.length > 22)
                            ? true
                            : false
                        }
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div id="snippScaleForm">
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "15px",
                  width: "100%",
                  overflowY: "auto",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  marginTop: "15px",
                  fontSize: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    margin: "0",
                    padding: "0",
                    flexDirection: "column",
                    // gap: "5px",
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <h1
                      id="headerText"
                      style={{ margin: "auto 0", fontSize: "15px" }}
                    >
                      Edit {scaleTitle}
                    </h1>
                  </div>
                  <h6 style={{ fontSize: "12px" }}>Orientation</h6>
                  <div
                    style={{
                      backgroundColor: "#e8e8e8",
                      // padding: "5px 10px",
                      borderRadius: "10px",
                      padding: "5px 7px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <select
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        // borderRadius: "10px",
                        // padding: "3px 10px",
                        height: "15px",
                        border: "none",
                        justifyContent: "center",
                        outline: "none",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "12px",
                        margin: "0 auto",
                      }}
                      className="bg-gray-800"
                      id="orientationIdStapel"
                    >
                      <option value="Horizontal" style={{ color: "black" }}>
                        Horizontal
                      </option>
                      <option value="Vertical" style={{ color: "black" }}>
                        Vertical
                      </option>
                    </select>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                      Scale Limit
                    </h6>
                    <div
                      style={{
                        backgroundColor: "#e8e8e8",
                        padding: "5px 7px",
                        borderRadius: "7px",
                        // height: "30px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="number"
                        style={{
                          width: "100px",
                          height: "12px",
                          display: "flex",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          alignItems: "center",
                        }}
                        id="upperVal"
                        onChange={(e) => setUpperLimit(e.target.value)}

                        // onChange={upperValueChange}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                      Spacing Unit
                    </h6>
                    <div
                      style={{
                        backgroundColor: "#e8e8e8",
                        padding: "3px 7px",
                        borderRadius: "7px",
                        // height: "30px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="number"
                        style={{
                          width: "100px",
                          height: "15px",
                          display: "flex",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          alignItems: "center",
                        }}
                        id="spacing"
                        onChange={(e) => setSpace(e.target.value)}
                        // value={-upperVal}
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "space-between",
                    gap: "10px",
                    marginTop: "10px",
                    // alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Scale Color
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="color"
                          style={{
                            width: "100px",
                            height: "12px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          id="scale_color_stapel"
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Round Color
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="color"
                          style={{
                            width: "100px",
                            height: "12px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          id="button_color_stapel"
                        />
                        {/* <BiChevronDown
                    size={20}
                    ref={ref}
                    style={{ fontSize: "12px", width: "4px" }}
                  /> */}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Font Color
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="color"
                          style={{
                            width: "100px",
                            height: "12px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          id="font_color_stapel"
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Font Style
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "3px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <select
                          style={{
                            width: "100px",
                            height: "15px",
                            display: "flex",
                            backgroundColor: "transparent",
                            outline: "none",
                            border: "none",
                            alignItems: "center",
                          }}
                          id="font_style_stapel"
                          defaultValue={
                            // !scaleDisplay ? undefined ? scaleDisplay="none" ? undefined : scaleBg
                            fontFamlity
                              ? fontFamlity.style.fontFamily
                              : "Select"
                          }
                        >
                          <option style={{ fontSize: "11px" }}>Select</option>
                          {fontStyles.map((fontStyle, index) => (
                            <option key={index} value={fontStyle}>
                              {fontStyle}
                            </option>
                          ))}
                        </select>
                        {/* <BiChevronDown
                    size={20}
                    ref={ref}
                    style={{ fontSize: "12px", width: "4px" }}
                  /> */}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Format
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "3px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "90%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <select
                          style={{
                            width: "80px",
                            height: "15px",
                            display: "flex",
                            backgroundColor: "transparent",
                            outline: "none",
                            border: "none",
                            alignItems: "center",
                          }}
                          id="format_stapel"
                          onChange={handleFormatStapel}
                        >
                          <option value="number">Number</option>
                          <option value="image">Image</option>
                          <option value="emoji">Emoji</option>
                        </select>
                        {/* <BiChevronDown
                    size={20}
                    ref={ref}
                    style={{ fontSize: "12px", width: "4px" }}
                  /> */}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "none",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                      id="emoji_stapel"
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Select Emoji
                      </h6>
                      <div
                        style={{
                          position: "relative",
                          backgroundColor: "#e8e8e8",
                          padding: "3px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          style={{
                            width: "100px",
                            height: "15px",
                            display: "flex",
                            backgroundColor: "transparent",
                            outline: "none",
                            border: "none",
                            alignItems: "center",
                          }}
                          id="emojiInp_stapel"
                          value={inputStr}
                          onChange={(e) => setInputStr(e.target.value)}
                        />

                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "-140px",
                            zIndex: 1,
                            maxWidth: "250px",
                            maxHeight: "300px",
                            overflowY: "auto",
                            padding: "5px",
                          }}
                        >
                          {showPicker && <Picker onEmojiClick={onEmojiClick} />}
                        </div>
                        <GrEmoji
                          style={{
                            position: "absolute",
                            zIndex: "1",
                            backgroundColor: "#e8e8e8",
                            right: "-14px",
                            // top: "1px",
                          }}
                          onClick={() =>
                            inputStr.length ===
                            Math.floor(upperLimit / space) * 2 * 2
                              ? ""
                              : setShowPicker(!showPicker)
                          }
                        />
                      </div>
                      {inputStr.length <
                        Math.floor(upperLimit / space) * 2 * 2 ||
                      inputStr.length >
                        Math.floor(upperLimit / space) * 2 * 2 ? (
                        <p style={{ fontSize: "small", color: "red" }}>
                          select {Math.floor(upperLimit / space) * 2} emojis
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div
                      style={{
                        display: "none",
                        flexDirection: "column",
                        gap: "1px",
                      }}
                      id="image"
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "10px" }}>
                        Upload Image
                      </h6>
                      <div
                        style={{
                          position: "relative",
                          // backgroundColor: "#e8e8e8",
                          padding: "3px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          style={{
                            width: "100px",
                            // height: "18px",
                            display: "flex",
                            backgroundColor: "transparent",
                            outline: "none",
                            border: "none",
                            alignItems: "center",
                          }}
                          type="file"
                          onChange={handleImage}
                        />
                        {selectedImages.length > 0 && (
                          <div
                            style={{
                              // display: "flex",
                              // flexDirection: "row",
                              width: "100%",
                              gap: "2px",
                              padding: "5px",
                            }}
                            id="ImageUpload"
                          >
                            {selectedImages.map((imageData, index) => (
                              <img
                                key={index}
                                src={imageData}
                                alt={`Uploaded ${index}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Left
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="text"
                          style={{
                            width: "100px",
                            height: "12px",
                            display: "flex",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            alignItems: "center",
                          }}
                          id="leftStapel"
                          disabled={
                            isEmojiFormat === true &&
                            (inputStr.length <
                              Math.floor(upperLimit / space) * 2 * 2 ||
                              inputStr.length >
                                Math.floor(upperLimit / space) * 2 * 2)
                              ? true
                              : false
                          }
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Right
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "3px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="text"
                          style={{
                            width: "100%",
                            height: "15px",
                            display: "flex",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            alignItems: "center",
                          }}
                          // defaultValue={
                          //   // !scaleDisplay ? undefined ? scaleDisplay="none" ? undefined : scaleBg
                          //   rightChild ? rightChild.innerHTML : ""
                          // }
                          id="rightStapel"
                          disabled={
                            isEmojiFormat === true &&
                            (inputStr.length <
                              Math.floor(upperLimit / space) * 2 * 2 ||
                              inputStr.length >
                                Math.floor(upperLimit / space) * 2 * 2)
                              ? true
                              : false
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                    }}
                  >
                    <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                      Scale label
                    </h6>
                    <div
                      style={{
                        backgroundColor: "#e8e8e8",
                        padding: "5px 7px",
                        borderRadius: "7px",
                        // height: "30px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        onChange={(e) => setScaleTitle(e.target.value)}
                        defaultValue={scaleT ? scaleT.innerHTML : ""}
                        style={{
                          width: "82px",
                          height: "12px",
                          display: "flex",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          alignItems: "center",
                        }}
                        id="scaleLabel_stapel"
                        disabled={
                          isEmojiFormat === true &&
                          (inputStr.length <
                            Math.floor(upperLimit / space) * 2 * 2 ||
                            inputStr.length >
                              Math.floor(upperLimit / space) * 2 * 2)
                            ? true
                            : false
                        }
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                      Number of scales
                    </h6>
                    <div
                      style={{
                        backgroundColor: "#e8e8e8",
                        padding: "3px 7px",
                        borderRadius: "7px",
                        // height: "30px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="1"
                        style={{
                          width: "100%",
                          height: "15px",
                          display: "flex",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          alignItems: "center",
                        }}
                        id="scales_stapel"
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      // gap: "2px",
                      alignItems: "center",
                      justifyContent: "space-between      ",
                    }}
                  >
                    <h6 style={{ fontSize: "12px" }}>Time(sec)</h6>

                    <div class="form-check form-switch">
                      <input
                        style={{ cursor: "pointer" }}
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        // onChange={(e) => setIsSwitchEnabled(e.target.checked)}
                        onChange={onTimeChangeStapel}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "none",
                      flexDirection: "column",
                      gap: "2px",
                      marginTop: "-10px",
                    }}
                    id="timeId_stapel"
                  >
                    <div
                      style={{
                        backgroundColor: "#e8e8e8",
                        padding: "3px 7px",
                        borderRadius: "7px",
                        // height: "30px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="1"
                        style={{
                          width: "100%",
                          height: "15px",
                          display: "flex",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          alignItems: "center",
                        }}
                        id="time_stapel"
                      />
                    </div>
                  </div>
                  {/* // )} */}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    padding: "0 5px",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                  ></div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <Button
                        id="button_id"
                        type="button"
                        width="50%"
                        marginTop="60px"
                        onClick={handleUpdates}
                        disabled={
                          isEmojiFormat === true &&
                          (inputStr.length <
                            Math.floor(upperLimit / space) * 2 * 2 ||
                            inputStr.length >
                              Math.floor(upperLimit / space) * 2 * 2)
                            ? true
                            : false
                        }
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div id="npsLiteScaleForm">
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "15px",
                  width: "100%",
                  overflowY: "auto",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  marginTop: "15px",
                  fontSize: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    margin: "0",
                    padding: "0",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <h1
                      id="headerText"
                      style={{ margin: "auto 0", fontSize: "15px" }}
                    >
                      Edit {scaleTitle}
                    </h1>
                  </div>
                  <h6 style={{ fontSize: "12px" }}>Orientation</h6>
                  <div
                    style={{
                      backgroundColor: "#e8e8e8",
                      borderRadius: "10px",
                      padding: "5px 7px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <select
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        height: "15px",
                        border: "none",
                        justifyContent: "center",
                        outline: "none",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "12px",
                        margin: "0 auto",
                      }}
                      className="bg-gray-800"
                      id="orientationId_nps_lite"
                    >
                      <option value="Horizontal" style={{ color: "black" }}>
                        Horizontal
                      </option>
                      <option value="Vertical" style={{ color: "black" }}>
                        Vertical
                      </option>
                    </select>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Scale Color
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="color"
                          style={{
                            width: "100px",
                            height: "12px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          id="scale_color_nps_lite"
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Font Color
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="color"
                          style={{
                            width: "100px",
                            height: "12px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          id="font_color_nps_lite"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Font Style
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "3px 7px",
                          borderRadius: "7px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <select
                          style={{
                            width: "100px",
                            height: "15px",
                            display: "flex",
                            backgroundColor: "transparent",
                            outline: "none",
                            border: "none",
                            alignItems: "center",
                          }}
                          id="font_style_nps_lite"
                          defaultValue={
                            fontFamlity
                              ? fontFamlity.style.fontFamily
                              : "Select"
                          }
                        >
                          <option style={{ fontSize: "11px" }}>Select</option>
                          {fontStyles.map((fontStyle, index) => (
                            <option key={index} value={fontStyle}>
                              {fontStyle}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Scale label
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="text"
                          onChange={(e) => setScaleTitle(e.target.value)}
                          defaultValue={scaleT ? scaleT.innerHTML : ""}
                          style={{
                            width: "82px",
                            height: "12px",
                            display: "flex",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            alignItems: "center",
                          }}
                          id="scale_label_nps_lite"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Format
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "3px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <select
                          style={{
                            width: "70px",
                            height: "15px",
                            display: "flex",
                            backgroundColor: "transparent",
                            outline: "none",
                            border: "none",
                            alignItems: "center",
                          }}
                          id="format_nps_lite"
                          onChange={handleFormatNpsLite}
                        >
                          <option value="text">Text</option>
                          <option value="emoji">Emoji</option>
                        </select>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "none",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                      id="emoji_nps_lite"
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Select Emoji
                      </h6>
                      <div
                        style={{
                          position: "relative",
                          backgroundColor: "#e8e8e8",
                          padding: "3px 7px",
                          borderRadius: "7px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          style={{
                            width: "100px",
                            height: "15px",
                            display: "flex",
                            backgroundColor: "transparent",
                            outline: "none",
                            border: "none",
                            alignItems: "center",
                          }}
                          id="emoji_inp_nps_lite"
                          value={inputStr}
                          onChange={(e) => setInputStr(e.target.value)}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "-140px",
                            zIndex: 1,
                            maxWidth: "250px",
                            maxHeight: "300px",
                            overflowY: "auto",
                            padding: "5px",
                          }}
                        >
                          {showPicker && <Picker onEmojiClick={onEmojiClick} />}
                        </div>
                        <GrEmoji
                          style={{
                            position: "absolute",
                            zIndex: "1",
                            backgroundColor: "#e8e8e8",
                            right: "-14px",
                          }}
                          onClick={() => setShowPicker(!showPicker)}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "space-between",
                      margin: "auto 0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Left
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="text"
                          style={{
                            width: "100px",
                            height: "12px",
                            display: "flex",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            alignItems: "center",
                          }}
                          id="left_nps_lite"
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Centre
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "3px 7px",
                          borderRadius: "7px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="text"
                          style={{
                            width: "100px",
                            height: "15px",
                            display: "flex",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          id="center_nps_lite"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Right
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "3px 7px",
                          borderRadius: "7px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="text"
                          style={{
                            width: "100%",
                            height: "15px",
                            display: "flex",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            alignItems: "center",
                          }}
                          id="right_nps_lite"
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Number of Scales
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "3px 7px",
                          borderRadius: "7px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="text"
                          placeholder="1"
                          style={{
                            width: "100%",
                            height: "15px",
                            display: "flex",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            alignItems: "center",
                          }}
                          id="scale_nps_lite"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h6 style={{ fontSize: "12px" }}>Time(sec)</h6>
                    <div class="form-check form-switch">
                      <input
                        style={{ cursor: "pointer" }}
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        onChange={onTimeChangeNpsLite}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "none",
                      flexDirection: "column",
                      gap: "2px",
                      marginTop: "-10px",
                    }}
                    id="timeId_nps_lite"
                  >
                    <div
                      style={{
                        backgroundColor: "#e8e8e8",
                        padding: "3px 7px",
                        borderRadius: "7px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="1"
                        style={{
                          width: "100%",
                          height: "15px",
                          display: "flex",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          alignItems: "center",
                        }}
                        id="time_nps_lite"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "none",
                      flexDirection: "column",
                      gap: "2px",
                      marginTop: "-10px",
                    }}
                    id="scoreInput"
                  >
                    <div
                      style={{
                        backgroundColor: "#e8e8e8",
                        padding: "3px 7px",
                        borderRadius: "7px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="1"
                        style={{
                          width: "100%",
                          height: "15px",
                          display: "flex",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          alignItems: "center",
                        }}
                        id="score"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    id="button_id"
                    type="button"
                    width="50%"
                    marginTop="60px"
                    onClick={handleUpdates}
                  >
                    Update
                  </Button>
                </div>
              </form>
            </div>
            <div id="likertScaleForm">
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "15px",
                  width: "100%",
                  overflowY: "auto",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  marginTop: "15px",
                  fontSize: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    margin: "0",
                    padding: "0",
                    flexDirection: "column",
                    // gap: "5px",
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <h1
                      id="headerText"
                      style={{ margin: "auto 0", fontSize: "15px" }}
                    >
                      Edit {scaleTitle}
                    </h1>
                  </div>
                  <h6 style={{ fontSize: "12px" }}>Orientation</h6>
                  <div
                    style={{
                      backgroundColor: "#e8e8e8",
                      // padding: "5px 10px",
                      borderRadius: "10px",
                      padding: "5px 7px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <select
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        // borderRadius: "10px",
                        // padding: "3px 10px",
                        height: "15px",
                        border: "none",
                        justifyContent: "center",
                        outline: "none",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "12px",
                        margin: "0 auto",
                      }}
                      className="bg-gray-800"
                      id="orientationIdLinkert"
                    >
                      <option style={{ color: "black" }}>Chosse..</option>
                      <option value="Horizontal" style={{ color: "black" }}>
                        Horizontal
                      </option>
                      <option value="Vertical" style={{ color: "black" }}>
                        Vertical
                      </option>
                    </select>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                      Name of Scale
                    </h6>
                    <div
                      style={{
                        backgroundColor: "#e8e8e8",
                        padding: "5px 7px",
                        borderRadius: "7px",
                        // height: "30px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        onChange={(e) => setScaleTitle(e.target.value)}
                        defaultValue={scaleT ? scaleT.innerHTML : ""}
                        style={{
                          width: "82px",
                          height: "12px",
                          display: "flex",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          alignItems: "center",
                        }}
                        id="scaleLabel_Likert"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                      Number of Scale
                    </h6>
                    <div
                      style={{
                        backgroundColor: "#e8e8e8",
                        padding: "3px 7px",
                        borderRadius: "7px",
                        // height: "30px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="1"
                        style={{
                          width: "100px",
                          height: "12px",
                          display: "flex",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          alignItems: "center",
                        }}
                        id="likert_no_scale"
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "10px",
                    marginTop: "10px",
                    // alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Font Color
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="color"
                          style={{
                            width: "100px",
                            height: "12px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          id="font_color_likert"
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Round Color
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="color"
                          style={{
                            width: "100px",
                            height: "12px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          id="button_color_likert"
                        />
                        {/* <BiChevronDown
                    size={20}
                    ref={ref}
                    style={{ fontSize: "12px", width: "4px" }}
                  /> */}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "7px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Label Type
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "102%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <select
                          onChange={handleLabelTypeChange}
                          value={labelType}
                          style={{
                            width: "100%",
                            backgroundColor: "transparent",
                            // borderRadius: "10px",
                            // padding: "3px 10px",
                            height: "16px",
                            border: "none",
                            justifyContent: "center",
                            outline: "none",
                            display: "flex",
                            alignItems: "center",
                            fontSize: "12px",
                            margin: "0 auto",
                          }}
                          className="bg-gray-800"
                          id="label_type_linkert"
                        >
                          <option style={{ color: "black" }}>
                            Select Label Type
                          </option>
                          <option value="Text" style={{ color: "black" }}>
                            Text
                          </option>
                          <option value="Image" style={{ color: "black" }}>
                            Image
                          </option>
                        </select>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "7px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Font Style
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "3px 3px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <select
                          style={{
                            width: "100px",
                            height: "15px",
                            display: "flex",
                            backgroundColor: "transparent",
                            outline: "none",
                            border: "none",
                            alignItems: "center",
                          }}
                          id="font_style_likert"
                          defaultValue={
                            // !scaleDisplay ? undefined ? scaleDisplay="none" ? undefined : scaleBg
                            fontFamlity
                              ? fontFamlity.style.fontFamily
                              : "Select"
                          }
                        >
                          <option style={{ fontSize: "11px" }}>Select</option>
                          {fontStyles.map((fontStyle, index) => (
                            <option key={index} value={fontStyle}>
                              {fontStyle}
                            </option>
                          ))}
                        </select>
                        {/* <BiChevronDown
                    size={20}
                    ref={ref}
                    style={{ fontSize: "12px", width: "4px" }}
                  /> */}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "7px",
                    }}
                  >
                    <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                      Label Scale Selection
                    </h6>
                    <div
                      style={{
                        backgroundColor: "#e8e8e8",
                        padding: "5px 10px",
                        borderRadius: "10px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <select
                        onChange={handleLabelScaleChange}
                        style={{
                          width: "100%",
                          backgroundColor: "transparent",
                          height: "15px",
                          border: "none",
                          justifyContent: "center",
                          outline: "none",
                          display: "flex",
                          alignItems: "center",
                          fontSize: "12px",
                          margin: "0 auto",
                        }}
                        className="bg-gray-800"
                        id="labelScaleLinkert"
                        value={labelScale}
                      >
                        <option style={{ color: "black" }}>
                          --Select Choice--
                        </option>
                        <option value="2" style={{ color: "black" }}>
                          Yes/No
                        </option>
                        <option value="3" style={{ color: "black" }}>
                          3 Points Scales
                        </option>
                        <option value="4" style={{ color: "black" }}>
                          4 Points Scales
                        </option>
                        <option value="5" style={{ color: "black" }}>
                          5 Points Scales
                        </option>
                        <option value="7" style={{ color: "black" }}>
                          7 Points Scales
                        </option>
                        <option value="9" style={{ color: "black" }}>
                          9 Points Scales
                        </option>
                      </select>
                    </div>
                    {/* Add a section for the user to input labels */}
                    {/* Add a section for the user to input labels */}
                    {labelType === "Text" &&
                      labelScale !== "--Select Choice--" && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "7px",
                          }}
                          className="label-text-container"
                        >
                          <h6>Text Labels</h6>
                          {labelTexts.map((labelText, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                gap: "7px",
                                alignItems: "center",
                              }}
                            >
                              <label>{`Label Input ${index + 1}`}</label>
                              <div
                                style={{
                                  width: "150px",
                                  height: "20px",
                                  backgroundColor: "#e8e8e8",
                                  borderRadius: "5px",
                                  display: "flex",
                                  alignItems: "center",
                                  paddingLeft: "5px",
                                }}
                              >
                                <input
                                  type="text"
                                  value={labelText}
                                  onChange={(event) =>
                                    handleLabelTextChange(index, event)
                                  }
                                  className="label-text-input"
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    outline: "none",
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    {labelType === "Image" &&
                      labelScale !== "--Select Choice--" && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "7px",
                          }}
                          id="label-image-container"
                        >
                          <h6>Image Labels</h6>
                          {Array.from(
                            { length: Number(labelScale) },
                            (_, index) => (
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  gap: "7px",
                                  alignItems: "center",
                                }}
                              >
                                <label>{`Label Input ${index + 1}`}</label>
                                <div
                                  style={{
                                    width: "150px",
                                    height: "20px",
                                    backgroundColor: "#e8e8e8",
                                    borderRadius: "5px",
                                    display: "flex",
                                    alignItems: "center",
                                    paddingLeft: "5px",
                                  }}
                                >
                                  <input
                                    type="text"
                                    value={selectedEmojis[index]}
                                    onChange={(event) =>
                                      handleEmojiChange(index, event)
                                    }
                                    style={{
                                      backgroundColor: "transparent",
                                      border: "none",
                                      outline: "none",
                                    }}
                                    id="label_image"
                                  />
                                  <span style={{ marginLeft: "5px" }}>
                                    <GrEmoji
                                      onClick={() =>
                                        setActiveEmojiPicker(index)
                                      }
                                    />
                                    {activeEmojiPicker === index && (
                                      <Picker
                                        onEmojiClick={(emojiObject) => {
                                          handleEmojiChange(
                                            index,
                                            emojiObject.emoji
                                          );
                                          setActiveEmojiPicker(null);
                                        }}
                                      />
                                    )}
                                  </span>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      // gap: "2px",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h6 style={{ fontSize: "12px" }}>Time(sec)</h6>

                    <div class="form-check form-switch">
                      <input
                        style={{ cursor: "pointer" }}
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        // onChange={(e) => setIsSwitchEnabled(e.target.checked)}
                        onChange={onTimeChangeLikert}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "none",
                      flexDirection: "column",
                      gap: "2px",
                      marginTop: "-10px",
                    }}
                    id="timeId_likert"
                  >
                    <div
                      style={{
                        backgroundColor: "#e8e8e8",
                        padding: "3px 7px",
                        borderRadius: "7px",
                        // height: "30px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="1"
                        style={{
                          width: "100%",
                          height: "15px",
                          display: "flex",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          alignItems: "center",
                        }}
                        id="time_likert"
                      />
                    </div>
                  </div>
                  {/* // )} */}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    padding: "0 5px",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                  ></div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <Button
                        id="button_id"
                        type="button"
                        width="50%"
                        marginTop="60px"
                        onClick={handleUpdates}
                        disabled={isUpdateButtonDisabled} // Disable the button if any text or image input is empty
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div id="percentScaleForm">
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "15px",
                  width: "100%",
                  overflowY: "auto",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  marginTop: "15px",
                  fontSize: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    margin: "0",
                    padding: "0",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <h1
                      id="headerText"
                      style={{ margin: "auto 0", fontSize: "15px" }}
                    >
                      Edit {scaleTitle}
                    </h1>
                  </div>
                  <h6 style={{ fontSize: "12px" }}>Orientation</h6>
                  <div
                    style={{
                      backgroundColor: "#e8e8e8",
                      borderRadius: "10px",
                      padding: "5px 7px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <select
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        height: "15px",
                        border: "none",
                        justifyContent: "center",
                        outline: "none",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "12px",
                        margin: "0 auto",
                      }}
                      className="bg-gray-800"
                      id="orientationId_percent"
                    >
                      <option value="Horizontal" style={{ color: "black" }}>
                        Horizontal
                      </option>
                      <option value="Vertical" style={{ color: "black" }}>
                        Vertical
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Slider Color
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="color"
                          style={{
                            width: "100px",
                            height: "12px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          // defaultValue="red"
                          id="slider_color_percent_scale"
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Font Color
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="color"
                          style={{
                            width: "100px",
                            height: "12px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          id="font_color_percent"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Font Style
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "3px 7px",
                          borderRadius: "7px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <select
                          style={{
                            width: "100px",
                            height: "15px",
                            display: "flex",
                            backgroundColor: "transparent",
                            outline: "none",
                            border: "none",
                            alignItems: "center",
                          }}
                          id="font_style_percent"
                          defaultValue={
                            fontFamlity
                              ? fontFamlity.style.fontFamily
                              : "Select"
                          }
                        >
                          <option style={{ fontSize: "11px" }}>Select</option>
                          {fontStyles.map((fontStyle, index) => (
                            <option key={index} value={fontStyle}>
                              {fontStyle}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Scale label
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          // height: "30px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="text"
                          onChange={(e) => setScaleTitle(e.target.value)}
                          defaultValue={scaleT ? scaleT.innerHTML : ""}
                          style={{
                            width: "82px",
                            height: "12px",
                            display: "flex",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            alignItems: "center",
                          }}
                          id="scale_label_percent"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                      Product count
                    </h6>
                    <div
                      style={{
                        backgroundColor: "#e8e8e8",
                        padding: "5px 7px",
                        borderRadius: "7px",
                        // height: "30px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="number"
                        // onChange={(e) => setScaleTitle(e.target.value)}
                        // defaultValue={scaleT ? scaleT.innerHTML : ""}
                        style={{
                          width: "100%",
                          height: "12px",
                          display: "flex",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          alignItems: "center",
                        }}
                        min="1"
                        max="10"
                        id="product_percent_scale"
                        value={productCount}
                        onChange={handleProductCountChange}
                      />
                    </div>
                    <div id="product_name">
                      {inputFields.map((inputField, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: "6px",
                          }}
                        >
                          <p style={{ margin: "auto 0" }}>Label {index + 1}</p>
                          <div>{inputField}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h6 style={{ fontSize: "12px" }}>Time(sec)</h6>
                    <div class="form-check form-switch">
                      <input
                        style={{ cursor: "pointer" }}
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        onChange={onTimeChangePercent}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "none",
                      flexDirection: "column",
                      gap: "2px",
                      marginTop: "-10px",
                    }}
                    id="timeId_percent"
                  >
                    <div
                      style={{
                        backgroundColor: "#e8e8e8",
                        padding: "3px 7px",
                        borderRadius: "7px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="1"
                        style={{
                          width: "100%",
                          height: "15px",
                          display: "flex",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          alignItems: "center",
                        }}
                        id="time_percent"
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "none",
                      flexDirection: "column",
                      gap: "2px",
                      marginTop: "-10px",
                    }}
                    id="scoreInput"
                  >
                    <div
                      style={{
                        backgroundColor: "#e8e8e8",
                        padding: "3px 7px",
                        borderRadius: "7px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="1"
                        style={{
                          width: "100%",
                          height: "15px",
                          display: "flex",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          alignItems: "center",
                        }}
                        id="score"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Button
                    id="button_id"
                    type="button"
                    width="50%"
                    marginTop="60px"
                    onClick={handleUpdates}
                  >
                    Update
                  </Button>
                </div>
              </form>
            </div>
            <div id="percentSumScaleForm">
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "15px",
                  width: "100%",
                  overflowY: "auto",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  marginTop: "15px",
                  fontSize: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    margin: "0",
                    padding: "0",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <h1
                      id="headerText"
                      style={{ margin: "auto 0", fontSize: "15px" }}
                    >
                      Edit {scaleTitle}
                    </h1>
                  </div>
                  <h6 style={{ fontSize: "12px" }}>Orientation</h6>
                  <div
                    style={{
                      backgroundColor: "#e8e8e8",
                      borderRadius: "10px",
                      padding: "5px 7px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <select
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        height: "15px",
                        border: "none",
                        justifyContent: "center",
                        outline: "none",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "12px",
                        margin: "0 auto",
                      }}
                      className="bg-gray-800"
                      id="orientationId_percent_sum"
                    >
                      <option value="Horizontal" style={{ color: "black" }}>
                        Horizontal
                      </option>
                      <option value="Vertical" style={{ color: "black" }}>
                        Vertical
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Slider Color
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="color"
                          style={{
                            width: "100px",
                            height: "12px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          id="slider_color_percent_sum_scale"
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Font Color
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="color"
                          style={{
                            width: "100px",
                            height: "12px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          id="font_color_percent_sum"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Font Style
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "3px 7px",
                          borderRadius: "7px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <select
                          style={{
                            width: "100px",
                            height: "15px",
                            display: "flex",
                            backgroundColor: "transparent",
                            outline: "none",
                            border: "none",
                            alignItems: "center",
                          }}
                          id="font_style_percent_sum"
                          defaultValue={
                            fontFamlity
                              ? fontFamlity.style.fontFamily
                              : "Select"
                          }
                        >
                          <option style={{ fontSize: "11px" }}>Select</option>
                          {fontStyles.map((fontStyle, index) => (
                            <option key={index} value={fontStyle}>
                              {fontStyle}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                        Name of Scale
                      </h6>
                      <div
                        style={{
                          backgroundColor: "#e8e8e8",
                          padding: "5px 7px",
                          borderRadius: "7px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="text"
                          onChange={(e) => setScaleTitle(e.target.value)}
                          defaultValue={scaleT ? scaleT.innerHTML : ""}
                          style={{
                            width: "82px",
                            height: "12px",
                            display: "flex",
                            backgroundColor: "transparent",
                            border: "none",
                            outline: "none",
                            alignItems: "center",
                          }}
                          id="scale_label_percent_sum"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                      Number of scales
                    </h6>
                    <div
                      style={{
                        backgroundColor: "#e8e8e8",
                        padding: "3px 7px",
                        borderRadius: "7px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="1"
                        style={{
                          width: "100%",
                          height: "15px",
                          display: "flex",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          alignItems: "center",
                        }}
                        id="scales_precent_sum"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <h6 style={{ margin: "auto 0", fontSize: "12px" }}>
                      Product count
                    </h6>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#e8e8e8",
                      padding: "3px 7px",
                      borderRadius: "7px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="text"
                      value={percentSumInputValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDownPress}
                      placeholder="No. of Products"
                      style={{
                        width: "100%",
                        height: "15px",
                        display: "flex",
                        backgroundColor: "transparent",
                        border: "none",
                        outline: "none",
                        alignItems: "center",
                      }}
                      id="percent_sum_product_count"
                    />
                  </div>
                  {percentSumInputValue && (Number(percentSumInputValue) >= 2 && Number(percentSumInputValue) <= 10) && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "7px",
                      }}
                      id="product_count_label"
                    >
                      {percentSumLabelTexts.map((percentSumLabelText, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            gap: "7px",
                            alignItems: "center",
                          }}
                        >
                          <label>{`Product ${index + 1} Name`}</label>
                          <div
                            style={{
                              width: "150px",
                              height: "20px",
                              backgroundColor: "#e8e8e8",
                              borderRadius: "5px",
                              display: "flex",
                              alignItems: "center",
                              paddingLeft: "5px",
                            }}
                          >
                            <input
                              type="text"
                              value={percentSumLabelText}
                              onChange={(event) =>
                                handlePercentSumLabelTextChange(index, event)
                              }
                              placeholder={`Product ${index + 1}`}
                              style={{
                                backgroundColor: "transparent",
                                border: "none",
                                outline: "none",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h6 style={{ fontSize: "12px" }}>Time(sec)</h6>
                    <div class="form-check form-switch">
                      <input
                        style={{ cursor: "pointer" }}
                        class="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        onChange={onTimeChangePercentSum}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "none",
                      flexDirection: "column",
                      gap: "2px",
                      marginTop: "-10px",
                    }}
                    id="timeId_percent_sum"
                  >
                    <div
                      style={{
                        backgroundColor: "#e8e8e8",
                        padding: "3px 7px",
                        borderRadius: "7px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="1"
                        style={{
                          width: "100%",
                          height: "15px",
                          display: "flex",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          alignItems: "center",
                        }}
                        id="time_percent_sum"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "none",
                      flexDirection: "column",
                      gap: "2px",
                      marginTop: "-10px",
                    }}
                    id="scoreInput"
                  >
                    <div
                      style={{
                        backgroundColor: "#e8e8e8",
                        padding: "3px 7px",
                        borderRadius: "7px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="text"
                        placeholder="1"
                        style={{
                          width: "100%",
                          height: "15px",
                          display: "flex",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          alignItems: "center",
                        }}
                        id="score"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Button
                    id="button_id"
                    type="button"
                    width="50%"
                    marginTop="60px"
                    disabled={isSubmitDisabled}
                    onClick={handleUpdates}
                  >
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div style={{ display: "none" }} id="border">
            <Row className="pt-4">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h6 style={{ marginRight: "10rem" }}>Border</h6>
                <label className="switch">
                  <input
                    type="checkbox"
                    onClick={() => setShowSlider(!showSlider)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              {showSlider && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#abab",
                    gap: "10px",
                    height: "40px",
                    width: "90%",
                  }}
                >
                  <input
                    type="color"
                    value={borderColor}
                    onChange={handleBorderColorChange}
                    id="color"
                    style={{ border: "none", width: "10%", height: "15px" }}
                  />
                  <input
                    type="range"
                    min="-10"
                    max="20"
                    value={borderSize}
                    onChange={handleBorderSizeChange}
                    onBlur={handleRangeBlur}
                    id="range"
                    className="range-color"
                  />
                </div>
              )}
            </Row>
            <hr />
          </div>
          <div id="settingRight" style={{ display: "none" }}>
            <h3>Configurations</h3>
            <div id="settingSelect">
              <select
                onChange={handleSelect}
                id="select1"
                // onChange={handleDateMethod}
                className="select border-0 bg-white rounded w-100 h-75 p-2"
                //multiple
                style={{ marginBottom: "40px" }}
              >
                <option value="select">Select Element</option>
                {options}
              </select>
            </div>

            {/* iframe */}
            <div>
              {/* <Form.Control
            type="text"
            placeholder={`${decoded.details._id}_scl1`}
            disabled
            className="mb-4"
          // id="iframe_src"
          // onChange={handleChange}
          /> */}
            </div>
            <div id="invisible">
              <div
                id="singleScale"
                style={{ padding: "10px", gap: "10px" }}
                className="select border-0 bg-white rounded w-100 h-75 p-2"
              ></div>

              {/* <div id="multiScale">
            // <select
            //   onChange={handleSelect}
            //   id="select"
            //   // onChange={handleDateMethod}
            //   className="select border-0 bg-white rounded w-100 h-75 p-2"
            //   //multiple
            //   style={{ marginBottom: "30px" }}
            // >
            //   {filteredArray?.map((element, index) => (
            //     <option key={index} value={element.type} id={element.id}>
            //       {`${element.type} ${element.id}`}
            //     </option>
            //   ))}
            // </select>
          </div> */}
            </div>
            <div className="mt-2 text-center pt-3">
              <Button
                variant="primary"
                className="px-5"
                onClick={refreshIframe}
              >
                refresh
              </Button>
            </div>
            <div
              className="text-center pt-3"
              style={{ display: "flex", gap: "10px" }}
            >
              <Button
                variant="primary"
                className="px-5"
                onClick={scaleSubmit}
                style={{ marginRight: "10px" }}
              >
                Save
              </Button>

              <Button
                variant="secondary"
                // className="remove_button"
                className="remove_button"
                onClick={removeScale}
              >
                Remove Scale
              </Button>
            </div>
            {/* iframe */}
          </div>
        </>
      )}
    </>
  );
};

export default ScaleRightSide;
// https://100035.pythonanywhere.com/api/nps_settings_create

//not working
