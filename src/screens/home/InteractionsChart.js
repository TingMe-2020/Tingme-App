import React from 'react';
import { StackedBarChart } from 'react-native-svg-charts';
import { View, Text } from 'native-base';
import * as scale from 'd3-scale';
import moment from 'moment';

import themeVariables from 'tingme/native-base-theme/variables/commonColor';

// const data = [
//   {
//     timestamp: new Date(2018, 12, 27, 1).valueOf(),
//     encountered: {
//       value: 10,
//       svg: {
//         onPress() {
//           alert('dcm');
//         }
//       }
//     },
//     viewProfile: {
//       value: 20,
//       svg: {
//         onPress() {
//           alert('vlc');
//         }
//       }
//     }
//   },
//   {
//     timestamp: new Date(2018, 12, 27, 2).valueOf(),
//     encountered: 5,
//     viewProfile: 8
//   },
//   {
//     timestamp: new Date(2018, 12, 27, 3).valueOf(),
//     encountered: 20,
//     viewProfile: 60
//   },
//   {
//     timestamp: new Date(2018, 12, 27, 4).valueOf(),
//     encountered: 25,
//     viewProfile: 89
//   },
//   {
//     timestamp: new Date(2018, 12, 27, 5).valueOf(),
//     encountered: 12,
//     viewProfile: 22
//   },
//   {
//     timestamp: new Date(2018, 12, 27, 6).valueOf(),
//     encountered: 5,
//     viewProfile: 16
//   }
// ];

const colors = [themeVariables.brandPrimary, themeVariables.brandWarning];
const keys = ['scanCount', 'profileViewCount'];

const XAxis = ({ data, formatLabel }) => (
  <View style={{ flex: 1, flexDirection: 'row' }}>
    {data.map((label, i) => (
      <View center style={{ flex: 1 }}>
        <Text
          style={{
            fontWeight: '100',
            fontSize: 9,
            color: themeVariables.noteTextColor
          }}>
          {formatLabel(data[i], i)}
        </Text>
      </View>
    ))}
  </View>
);

export default ({ data }) => {
  return (
    <View style={{ width: '100%' }}>
      <StackedBarChart
        style={{ height: 120 }}
        keys={keys}
        colors={colors}
        data={data}
        valueAccessor={({ item, key }) => item[key].value || item[key]}
        showGrid={true}
        contentInset={{ bottom: 10 }}
      />
      <XAxis
        data={data}
        formatLabel={(value, index) => {
          const startTime = Number(data[index].startTime);
          return `${moment(startTime).format('HH:mm')}`;
        }}
      />
      <XAxis
        data={data}
        formatLabel={(value, index) => {
          const startTime = Number(data[index].startTime);
          return `${moment(startTime)
            .add(4, 'h')
            .format('HH:mm')}`;
        }}
      />
    </View>
  );
};
