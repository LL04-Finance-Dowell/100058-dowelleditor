export default function convertInlineStylesToStyleObject(inlineStyles) {
  // Split the inline styles by semicolon to separate individual style declarations
  const styleDeclarations = inlineStyles.split(';');

  // Remove any leading or trailing whitespaces from each style declaration
  const trimmedDeclarations = styleDeclarations.map(declaration => declaration.trim());

  // Construct the style object
  const styleObject = trimmedDeclarations.reduce((result, declaration) => {
    if (declaration) {
      // Split each style declaration by colon to separate property and value
      const [property, value] = declaration.split(':');

      if (property && value) {
        // Convert property and value to camelCase format
        const formattedProperty = property.trim().replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        const formattedValue = value.trim();
        // Add the property-value pair to the style object
        if(formattedProperty==="backgroundImage"){
          const url = extractBackgroundImageURL(inlineStyles)
          result[formattedProperty]=url
        }else{
        result[formattedProperty] = formattedValue;
        }
      }
    }
   
    return result;
  }, {});

  return styleObject;
}

function extractBackgroundImageURL(inlineStyles) {
  const match = inlineStyles.match(/background-image:\s*url\("([^"]+)"\)/i);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}