import React from 'react';
import RenderHTML, {
  defaultSystemFonts,
  HTMLContentModel,
  HTMLElementModel,
} from 'react-native-render-html';
import {RFValue} from 'react-native-responsive-fontsize';
import {wp} from '../constants/sacling';
import {colors, fonts} from '../constants/theme';
const systemFonts = [
  ...defaultSystemFonts,
  fonts.Bold,
  fonts.Medium,
  fonts.Light,
  fonts.BoldItalic,
];
const customHTMLElementModels = {
  'blue-circle': HTMLElementModel.fromCustomModel({
    tagName: 'blue-circle',
    mixedUAStyles: {
      width: 50,
      height: 50,
      borderRadius: 25,
      alignSelf: 'center',
      backgroundColor: 'blue',
    },
    contentModel: HTMLContentModel.block,
  }),
};

const RenderHTMLComponent = ({htmlData}) => {
  return (
    <RenderHTML
      contentWidth={wp(90)}
      baseFontStyle={{fontSize: RFValue(10), color: 'green'}}
      source={{html: htmlData}}
      ignoredDomTags={['o:p', '\r', '\\n', 'iframe', 'br', 'center']}
      allowedStyles={[
        'backgroundColor',
        'fontFamily',
        'fontSize',
        'width',
        'height',
        'justifyContent',
        'alignItems',
        'alignSelf',
        'textAlign',
        'padding',
        'borderRadius',
        'marginTop',
        'paddingLeft',
        'minHeight',
        'minWidth',
      ]}
      classesStyles={{
        MsoNormal: {
          fontFamily: fonts.Medium,
          color: colors.primaryColor,
          fontSize: 2,
        },
      }}
      tagsStyles={{
        h1: {
          color: colors.primaryColor,
          fontFamily: fonts.Medium,
          padding: 0,
          marginTop: 0,
        },
        h2: {
          color: colors.primaryColor,
          fontFamily: fonts.Medium,
          lineHeight: RFValue(14) * 1.5,
          fontSize: RFValue(14),
        },
        h3: {
          color: colors.textPrimaryColor,
          fontFamily: fonts.Medium,
          lineHeight: RFValue(16) * 1.5,
          fontSize: RFValue(16),
        },
        b: {
          color: colors.primaryColor,
          fontFamily: fonts.Medium,
          fontSize: RFValue(1),
        },
        span: {
          fontFamily: fonts.Medium,
          color: colors.primaryColor,
          fontSize: RFValue(1),
          textAlign: 'justify',
        },
        div: {
          padding: 0,
          marginTop: 0,
          fontFamily: fonts.Medium,
          color: colors.primaryColor,
          fontSize: RFValue(1),
          textAlign: 'justify',
        },
        p: {
          fontFamily: fonts.Medium,
          color: colors.primaryColor,
          fontSize: RFValue(14),
          textAlign: 'justify',
        },
        h5: {
          fontFamily: fonts.Bold,
          color: 'red',
          fontSize: RFValue(14),
          textAlign: 'justify',
        },
        img: {
          width: wp(80),
          height: wp(60),
          borderRadius: wp(1),
        },
      }}
      enableExperimentalMarginCollapsing={true}
      enableExperimentalBRCollapsing={true}
      enableExperimentalGhostLinesPrevention={true}
      systemFonts={systemFonts}
      customHTMLElementModels={customHTMLElementModels}
    />
  );
};

export default RenderHTMLComponent;
