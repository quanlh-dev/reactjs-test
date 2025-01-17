export enum FieldType {
  STRING_FIELD_SPEC = 'StringFieldSpec',
  NUMBER_FIELD_SPEC = 'NumberFieldSpec',
}

export type IField = {
  id?: number;
  name: string;
  type: FieldType;
  offsetFrom: number;
  offsetTo: number;
  description: string;
};
