import ReactPDF, {
  pdf,
  Document,
  Page,
  Text,
  View,
  Image,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import convertInlineStylesToStyleObject from "./convertInlineStylesToStyleObject.js";


const pageSize={minWidth:'800px',minHeight:'1123px'}
const pazeHeaderStyle={display:"flex",flexDirection:"row",alignItems:"center",justifyContent:'space-between',fontSize:'10px',padding:"2px"}
const printDate =new Date()
let outputCanvas;
export const generatePDF = (pages,allScalesArray) => (

  <Document>
  {pages.map((element,index)=>
     {
      const pageElements = element.getElementsByClassName('holderDIV');
      const pageElementsArray=Array.from(pageElements)
      return( <Page style={StyleSheet.create(pageSize)}>
                  <View style={StyleSheet.create(pazeHeaderStyle)} > 
                  <Text>Page {index+1} of {pages.length} </Text> 
                  <Text>Printed On : {printDate.toLocaleString()} </Text>
                  </View>
                  <View>
                    {pageElementsArray.map((el,i) => {
                      //Grab parent div style 
                      const parentStyle = el.getAttribute("style")
                      // convert  parent style to style object to pass into JSX
                      const parentStyleObject=convertInlineStylesToStyleObject(parentStyle)
                      let  childDiv;
                      //Grab child div/button  
                      childDiv= Array.from(el.getElementsByTagName('button')).length>0 ? el.getElementsByTagName('button')[0]: el.querySelector("div")
                      //check if the first child contain the content 
                      if(childDiv.getAttribute('class')==='addImageSignButton'){
                        let childDivs = el.querySelectorAll('div');
                         childDiv = childDivs[1];
                      }             
                      //Grab child div style 
                      const childStyle = childDiv.getAttribute("style")
                      // convert child style to style object to pass into JSX
                      const childStyleObject=convertInlineStylesToStyleObject(childStyle)
                      //
                      //if the child componenet is button then push some additional styles
                       if(childDiv.tagName==='BUTTON' ){
                        childStyleObject.display='flex';
                        childStyleObject.flexDirection='row';
                        childStyleObject.justifyContent='center';
                        childStyleObject.alignItems='center';
                      }
                      return (
                        <View style={StyleSheet.create(parentStyleObject)}>
                          <View style={StyleSheet.create(childStyleObject)}>
                          {
                            childStyleObject.hasOwnProperty('backgroundImage')?
                            <Image style={StyleSheet.create({width:childStyleObject['width'],height:childStyleObject['height'] })} src={childStyleObject['backgroundImage']}/>
                            :childDiv.getAttribute('class')==='newScaleInput'? <Image style={StyleSheet.create({width:childStyleObject['width'],height:childStyleObject['height'] })} src={childDiv.getAttribute('snapshot')}></Image>:
                            <Text> {childDiv.innerText} </Text>
                          }
                     
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </Page>)}
           )}
  </Document>
);

export const downloadPDF = async (element,fileName,allScalesArray) => {
  pdf(generatePDF(element,allScalesArray))
    .toBlob()
    .then((blob) => saveAs(blob, `${fileName}.pdf`));
};





