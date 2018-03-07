import {IModel} from "./interface";
import {Serializable} from "../helper/serializable";

export class Freezer extends Serializable implements IModel {
  _id: string;
  tcId: string;
  userId: string;
  name: string;
  postcode: string;
  address: string;
  state: any = {
    comp: false,
    last_update: new Date(),
    fan: false,
    heater: false,
    temperature: 0
  };
  setting: any = {
    temperature: 0,
    normal: {
      low: {
        value: 0,
        keep: 0
      },
      high: {
        value: 0,
        keep: 0
      }
    },
    warning: {
      low: {
        value: 0,
        keep: 0
      },
      high: {
        value: 0,
        keep: 0
      }
    },
    danger: {
      low: {
        value: 0,
        keep: 0
      },
      high: {
        value: 0,
        keep: 0
      }
    },
    heater: 0,
    pan: 0,
    comp: 0
  };
  temperature: number;
  normalLowValue: number;
  normalHighValue: number;
  warningLowValue: number = 0;
  warningLowKeep: number;
  warningHighValue: number = 0;
  warningHighKeep: number;
  dangerLowValue: number;
  dangerLowKeep: number;
  dangerHighValue: number;
  dangerHighKeep: number;
  heater: number;
  pan: number;
  comp: number;

  constructor(
    _id?: string,
    tcId?: string,
    userId?: string,
    name?: string,
    postcode?: string,
    address?: string,
    state?: any,
    setting?: any,
    temperature?: number,
    normalLowValue?: number,
    normalHighValue?: number,
    warningLowValue?: number,
    warningLowKeep?: number,
    warningHighValue?: number,
    warningHighKeep?: number,
    dangerLowValue?: number,
    dangerLowKeep?: number,
    dangerHighValue?: number,
    dangerHighKeep?: number,
    heater?: number,
    pan?: number,
    comp?: number,
  ) {
    super();
  }


  toObject(): object {
    return {
      tcId: this.tcId,
      userId: this.userId,
      name: this.name,
      postcode: this.postcode,
      address: this.address,
      state: this.state,
      setting: this.setting,
      temperature: this.temperature,
      normalLowValue: this.normalLowValue,
      normalHighValue: this.normalHighValue,
      warningLowValue: this.warningLowValue,
      warningLowKeep: this.warningLowKeep,
      warningHighValue: this.warningHighValue,
      warningHighKeep: this.warningHighKeep,
      dangerLowValue: this.dangerLowValue,
      dangerLowKeep: this.dangerLowKeep,
      dangerHighValue: this.dangerHighValue,
      dangerHighKeep: this.dangerHighKeep,
      heater: this.heater,
      pan: this.pan,
      comp: this.comp,
    }
  }
}
