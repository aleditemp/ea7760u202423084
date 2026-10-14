import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class ChargingStation implements BaseEntity {
  #id: string;
  #stationName: string;
  #vehicleType: string;
  #maxGridKwCapacity: number;
  #stallsAvailable: number;
  #isActive: boolean;
  #locationCoordinates: {
    latitude: number;
    longitude: number
  };

  constructor(props: {
    id: string;
    stationName: string;
    vehicleType: string;
    maxGridKwCapacity: number;
    stallsAvailable: number;
    isActive: boolean;
    locationCoordinates: {
      latitude: number;
      longitude: number;
    };
  }) {
    this.#id = props.id;
    this.#stationName = props.stationName;
    this.#vehicleType = props.vehicleType;
    this.#maxGridKwCapacity = props.maxGridKwCapacity;
    this.#stallsAvailable = props.stallsAvailable;
    this.#isActive = props.isActive;
    this.#locationCoordinates = props.locationCoordinates;
  }

  get id(): string {
    return this.#id;
  }

  set id(value: string) {
    this.#id = value;
  }

  get stationName(): string {
    return this.#stationName;
  }

  set stationName(value: string) {
    this.#stationName = value;
  }

  get vehicleType(): string {
    return this.#vehicleType;
  }

  set vehicleType(value: string) {
    this.#vehicleType = value;
  }

  get maxGridKwCapacity(): number {
    return this.#maxGridKwCapacity;
  }

  set maxGridKwCapacity(value: number) {
    this.#maxGridKwCapacity = value;
  }

  get stallsAvailable(): number {
    return this.#stallsAvailable;
  }

  set stallsAvailable(value: number) {
    this.#stallsAvailable = value;
  }

  get isActive(): boolean {
    return this.#isActive;
  }

  set isActive(value: boolean) {
    this.#isActive = value;
  }

  get locationCoordinates(): { latitude: number; longitude: number } {
    return this.#locationCoordinates;
  }

  set locationCoordinates(value: { latitude: number; longitude: number }) {
    this.#locationCoordinates = value;
  }
}
