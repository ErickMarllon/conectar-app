import type { VariantsType } from '../types';
import { varTranEnter, varTranExit } from './transition';

export const varFade = (props?: VariantsType) => {
  const distance = props?.distance || 120;
  const durationIn = props?.durationIn;
  const durationOut = props?.durationOut;
  const easeIn = props?.easeIn;
  const easeOut = props?.easeOut;

  const enterTransition = varTranEnter({ durationIn, easeIn });
  const exitTransition = varTranExit({ durationOut, easeOut });

  return {
    in: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: enterTransition },
      exit: { opacity: 0, transition: exitTransition },
    },
    inUp: {
      initial: { y: distance, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: enterTransition },
      exit: { y: distance, opacity: 0, transition: exitTransition },
    },
    inDown: {
      initial: { y: -distance, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: enterTransition },
      exit: { y: -distance, opacity: 0, transition: exitTransition },
    },
    inLeft: {
      initial: { x: -distance, opacity: 0 },
      animate: { x: 0, opacity: 1, transition: enterTransition },
      exit: { x: -distance, opacity: 0, transition: exitTransition },
    },
    inRight: {
      initial: { x: distance, opacity: 0 },
      animate: { x: 0, opacity: 1, transition: enterTransition },
      exit: { x: distance, opacity: 0, transition: exitTransition },
    },
    out: {
      initial: { opacity: 1 },
      animate: { opacity: 0, transition: enterTransition },
      exit: { opacity: 1, transition: exitTransition },
    },
    outUp: {
      initial: { y: 0, opacity: 1 },
      animate: { y: -distance, opacity: 0, transition: enterTransition },
      exit: { y: 0, opacity: 1, transition: exitTransition },
    },
    outDown: {
      initial: { y: 0, opacity: 1 },
      animate: { y: distance, opacity: 0, transition: enterTransition },
      exit: { y: 0, opacity: 1, transition: exitTransition },
    },
    outLeft: {
      initial: { x: 0, opacity: 1 },
      animate: { x: -distance, opacity: 0, transition: enterTransition },
      exit: { x: 0, opacity: 1, transition: exitTransition },
    },
    outRight: {
      initial: { x: 0, opacity: 1 },
      animate: { x: distance, opacity: 0, transition: enterTransition },
      exit: { x: 0, opacity: 1, transition: exitTransition },
    },
  };
};
