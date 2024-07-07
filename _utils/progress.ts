import {GameData} from "./game.ts"


export enum Progress {
  Unset = "",
  NotApplicable = "notapplicable",
  New = "new",
  Started = "started",
  Beaten = "beaten",
  Completed = "completed",
  Mastered = "mastered",
}

export function progressToIconDef(progress?: Progress): string {
  switch (progress) {
    case undefined:
      return "";
    case Progress.Unset:
      return "";
    case Progress.NotApplicable:
      return "fa-x";
    case Progress.New:
      return "fa-ellipsis";
    case Progress.Started:
      return "fa-play";
    case Progress.Beaten:
      return "fa-circle-check";
    case Progress.Completed:
      return "fa-star";
    case Progress.Mastered:
      return "fa-trophy";
  }
}

export function progressToClassName(progress?: Progress): string {
  switch (progress) {
    case undefined:
      return "progress-unset";
    case Progress.Unset:
      return "progress-unset";
    case Progress.NotApplicable:
      return "progress-notapplicable";
    case Progress.New:
      return "progress-new";
    case Progress.Started:
      return "progress-started";
    case Progress.Beaten:
      return "progress-beaten";
    case Progress.Completed:
      return "progress-completed";
    case Progress.Mastered:
      return "progress-mastered";
  }
}

export function progressToTitle(progress?: Progress): string {
  switch (progress) {
    case undefined:
      return "";
    case Progress.Unset:
      return "";
    case Progress.NotApplicable:
      return "Not applicable";
    case Progress.New:
      return "New";
    case Progress.Started:
      return "Started";
    case Progress.Beaten:
      return "Beaten";
    case Progress.Completed:
      return "Completed";
    case Progress.Mastered:
      return "Mastered";
  }
}

// Duplicated in _static/scripting/sort.js
export function progress_to_number(progress?: Progress): number {
  switch (progress) {
    case undefined:
      return 0;
    case Progress.Unset:
      return 0;
    case Progress.NotApplicable:
      return 5;
    case Progress.New:
      return 10;
    case Progress.Started:
      return 20;
    case Progress.Beaten:
      return 30;
    case Progress.Completed:
      return 40;
    case Progress.Mastered:
      return 50;
  }
}

export function compare_progress(a: GameData, b: GameData): number {
  return progress_to_number(a.progress) - progress_to_number(b.progress)
}