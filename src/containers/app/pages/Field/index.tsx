import { Grid } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Canvas } from './components/Canvas/Canvas';
import { Editor } from './components/Editor/Editor';
import './index.scss';

type Props = {};

const Field: FC<Props> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return (
    <div className="field-container">
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Canvas />
        </Grid>
        <Grid item xs={5}>
          <Editor />
        </Grid>
      </Grid>
    </div>
  );
};

export default Field;
