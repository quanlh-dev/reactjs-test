import { Grid } from '@mui/material';
import { FC, useEffect } from 'react';
import { Canvas } from './components/Canvas/Canvas';
import { Editor } from './components/Editor/Editor';
import './index.scss';
import { useDispatch } from 'react-redux';
import { fetchFieldList, useFieldSlice } from './slices';

type Props = {};

const Field: FC<Props> = (props) => {
  const dispatch = useDispatch();
  useFieldSlice();
  useEffect(() => {
    dispatch(fetchFieldList());
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>CYBERSHIELD NETWORK</h2>
      <h4 style={{ textAlign: 'center' }}>Develop by Daniel</h4>
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
    </div>
  );
};

export default Field;
