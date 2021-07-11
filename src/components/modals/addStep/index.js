import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {LayoutModal} from '@/components/layouts';
import { modalActions, recipeUploadActions } from '@/store/actions';
import { connect } from 'react-redux';
import classes from "./addStep.module.scss";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '4px',
      minHeight: '50px'
    },
    '& .MuiInputBase-input': {
      height: 'auto',
    },
  }
}));

function AddStep (props) {
  const classMarerialUi = useStyles();
  const FIRST_STEP = 1;
  const { data } = props.recipeUpload;
  const [step, setStep] = React.useState({
    title: props?.modal?.params ? props?.modal?.params.title :'',
    description: props?.modal?.params ? props?.modal?.params.description :'',
    num: data.steps.length === 0 ? FIRST_STEP : data.steps.length + 1,
  });

  function onChangeField(name) {
    return (event) => {
      const newData = { ...step, [name]: event.target.value };
      setStep(newData);
    };
  }

  function handleAddStep (e) {
    e.preventDefault();
    const newData = { ...data, steps: [...data.steps, step] };
    props.dispatch(recipeUploadActions.update(newData));
    props.dispatch(modalActions.close());
  }

  function handleUpdateStep (e) {
    e.preventDefault();
    const newData = { ...data };
    newData.steps[props?.modal?.params.num - 1].title = step.title;
    newData.steps[props?.modal?.params.num - 1].description = step.description;
    props.dispatch(recipeUploadActions.update(newData));
    props.dispatch(modalActions.close());
  }

  const onCancel = () => {
    props.dispatch(modalActions.close());
  };

  const renderContent = () => {
    return <div className={classes.addStep}>
      <h2 className={classes.addStep__title}>
        {
          props?.modal?.params
          ? `Update Recipe Step ${props?.modal?.params.num}`
          : `Add Recipe Step ${data.steps.length === 0 ? FIRST_STEP : data.steps.length + 1}`
        }
      </h2>
      <form className={classes.addStep__form} onSubmit={props?.modal?.params ? handleUpdateStep : handleAddStep}>
        <div>
          <label htmlFor="addStep-name" className={classes.addStep__label}>Title</label>
          <TextField
            id="addStep-name"
            name="title"
            value={step.title}
            onChange={onChangeField('title')}
            variant="outlined"
            fullWidth
            className={classMarerialUi.textField}
          />
        </div>
        <div>
          <label htmlFor="addSep-description" className={classes.addStep__label}>Description</label>
          <TextField
            id="addSep-description"
            name="description"
            value={step.description}
            onChange={onChangeField('description')}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            className={classMarerialUi.textField}
          />
        </div>
        <div className={classes.addStep__buttonContainer}>
          <button
            type="submit"
            className={classes.addStep__button}
          >
            {
              props?.modal?.params
              ? 'Update'
              : 'Add'
            }
          </button>
        </div>
      </form>
    </div>;
  };

  return (
      <LayoutModal
        onClose={onCancel}
        themeName="white_small"
      >
        {renderContent()}
      </LayoutModal>
  );
}

export default connect((state => ({
  recipeUpload: state.recipeUpload,
  modal: state.modal
})))(AddStep);
