export class ScheduleEntity {
  scheduleId: string | undefined;
  courseId!: string;
  title!: string;
  image!: string | undefined;
  summary!: string | undefined;
  slogan!: string | undefined;
  dateStart!: Date | undefined;
  hours!: number | undefined;
  duration!: number | undefined;
  frequency!: string[] | undefined;
  type!: string | undefined;
  status!: string | undefined;
  whatLearn!: string[] | undefined;
  requirements!: string[] | undefined;
  content!: string[] | undefined;
}
