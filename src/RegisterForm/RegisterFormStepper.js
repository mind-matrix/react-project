import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { ArrowForward } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import BasicDetails from './BasicDetails';
import BusinessInfo from './BusinessInfo';
import PaymentInfo from './PaymentInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    display: 'block',
    margin: '0 auto',
    maxWidth: 300
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Basic Details', 'Business Info', 'Payment Info'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicDetails />;
    case 1:
      return <BusinessInfo />;
    case 2:
      return <PaymentInfo />;
    default:
      return 'Unknown step';
  }
}

export default function RegisterFormStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === -1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Box py={2}>
                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  <Box py={1}>
                    {activeStep === steps.length - 1 ? 'Register' : 'Next'}
                    {activeStep === steps.length - 1 ? '' : <ArrowForward style={{ float: 'right' }} /> }
                  </Box>
                </Button>
              </Box>
              <Button fullWidth disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}