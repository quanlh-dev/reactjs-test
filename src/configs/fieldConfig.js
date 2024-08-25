import React from 'react';
import FieldPerson from 'components/Field/FieldPerson/FieldPerson';
import FieldTimeline from 'components/Field/FieldTimeline/FieldTimeline';
import FieldSelect from 'components/Field/FieldSelect/FieldSelect';
import FieldProgress from 'components/Field/FieldProgress/FieldProgress';
import FieldCheckbox from 'components/Field/FieldCheckbox/FieldCheckbox';
import FieldDate from 'components/Field/FieldDate/FieldDate';
import FieldLink from 'components/Field/FieldLink/FieldLink';
import FieldNumber from 'components/Field/FieldNumber/FieldNumber';
import FieldFile from 'components/Field/FieldFile/FieldFile';
import FieldText from 'components/Field/FieldText/FieldText';
import FieldRangeNumber from 'components/Field/FieldRangeNumber/FieldRangeNumber';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faListAlt,
  faSortNumericUpAlt,
  faLink,
  faCalendarDay,
  faStream,
  faFileAlt,
  faCheckSquare,
  faHashtag,
  faSlidersH,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BiText } from 'react-icons/bi';
import FieldTag from 'components/Field/FieldTag/FieldTag';

export default {
  Assignee: {
    icon: <FontAwesomeIcon color="gray" icon={faUserCircle} />,
    fieldType: 'Assignee',
    isFieldSystem: true,
    component: FieldPerson,
  },
  Timeline: {
    icon: <FontAwesomeIcon color="gray" icon={faStream} />,
    fieldType: 'Timeline',
    isFieldSystem: false,
    component: FieldTimeline,
  },
  Priority: {
    icon: <FontAwesomeIcon color="gray" icon={faListAlt} />,

    fieldType: 'Priority',
    isFieldSystem: true,
    component: FieldSelect,
  },
  Percentage_Done: {
    icon: <FontAwesomeIcon color="gray" icon={faStream} />,

    fieldType: 'Percentage_Done',
    isFieldSystem: true,
    component: FieldProgress,
  },
  Status: {
    icon: <FontAwesomeIcon color="gray" icon={faListAlt} />,
    fieldType: 'Status',
    isFieldSystem: true,
    component: FieldSelect,
  },
  Text: {
    icon: <BiText color="gray" />,
    fieldType: 'Text',
    isFieldSystem: false,
    component: FieldText,
  },
  Peoples: {
    icon: <FontAwesomeIcon color="gray" icon={faUserCircle} />,
    fieldType: 'Peoples',
    isFieldSystem: false,
    component: FieldPerson,
  },
  Select: {
    icon: <FontAwesomeIcon color="gray" icon={faListAlt} />,

    fieldType: 'Select',
    isFieldSystem: false,
    component: FieldSelect,
  },
  Date: {
    icon: <FontAwesomeIcon color="gray" icon={faCalendarDay} />,
    fieldType: 'Date',
    isFieldSystem: false,
    component: FieldDate,
  },
  Range_Date: {
    icon: <FontAwesomeIcon color="gray" icon={faCalendarDay} />,

    fieldType: 'Range_Date',
    isFieldSystem: false,
    component: FieldTimeline,
  },
  Number: {
    icon: <FontAwesomeIcon color="gray" icon={faSortNumericUpAlt} />,
    fieldType: 'Number',
    isFieldSystem: false,
    component: FieldNumber,
  },
  Range_Number: {
    icon: <FontAwesomeIcon color="gray" icon={faSlidersH} />,

    fieldType: 'Range_Number',
    isFieldSystem: false,
    component: FieldRangeNumber,
  },
  Files: {
    icon: <FontAwesomeIcon color="gray" icon={faFileAlt} />,
    fieldType: 'Files',
    isFieldSystem: false,
    component: FieldFile,
  },
  Tags: {
    icon: <FontAwesomeIcon color="gray" icon={faHashtag} />,
    fieldType: 'Tags',
    isFieldSystem: false,
    component: FieldTag,
  },
  Checkbox: {
    icon: <FontAwesomeIcon color="gray" icon={faCheckSquare} />,
    fieldType: 'Checkbox',
    isFieldSystem: false,
    component: FieldCheckbox,
  },
  Progress: {
    icon: <FontAwesomeIcon color="gray" icon={faStream} />,
    fieldType: 'Progress',
    isFieldSystem: false,
    component: FieldProgress,
  },
  Link: {
    icon: <FontAwesomeIcon color="gray" icon={faLink} />,
    fieldType: 'Link',
    isFieldSystem: false,
    component: FieldLink,
  },
  Other: {
    isFieldSystem: false,
    component: FieldPerson,
  },
};
