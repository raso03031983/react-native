import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { PickerView } from "./style";

export default function Picker({ onChange, itensSelect }) {
  return (
    <PickerView>
      <RNPickerSelect
        style={{
          inputIOS: {
            height: 50,
            padding: 5,
            backgroundColor: "#FFF",
            fontSize: 16,
          },
        }}
        placeholder={{
          label: "Selecione",
          color: "#222",
          value: null,
        }}
        onValueChange={(tipo) => onChange(tipo)}
        items={itensSelect}
      />
    </PickerView>
  );
}
