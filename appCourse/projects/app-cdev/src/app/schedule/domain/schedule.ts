export type ScheduleStatus = 'published' | 'draft';

export interface ScheduleEssentials {
  title: string;
}

export interface ScheduleOptionals {
  scheduleId: string;
  slug: string;
  status: ScheduleStatus;
  courseId: string;
}

export type ScheduleProperties = ScheduleEssentials &
  Partial<ScheduleOptionals>;

export class Schedule {
  private readonly scheduleId: string | undefined;
  private readonly courseId!: string;
  private title!: string;
  private image: string | undefined;
  private summary: string | undefined;
  private slogan: string | undefined;
  private dateStart: Date | undefined;
  private hours: number | undefined;
  private duration: number | undefined;
  private frequency: string[] | undefined;
  private type: string | undefined;
  private status: string | undefined;
  private whatLearn: string[] | undefined;
  private requirements: string[] | undefined;
  private content: string[] | undefined;

  constructor(props: ScheduleProperties) {
    Object.assign(this, props);
  }

  get properties() {
    return {
      scheduleId: this.scheduleId,
      courseId: this.courseId,
      title: this.title,
      image: this.image,
      summary: this.summary,
      slogan: this.slogan,
      dateStart: this.dateStart,
      hours: this.hours,
      duration: this.duration,
      frequency: this.frequency,
      type: this.type,
      status: this.status,
      whatLearn: this.whatLearn,
      requirements: this.requirements,
      content: this.content,
    };
  }
}
