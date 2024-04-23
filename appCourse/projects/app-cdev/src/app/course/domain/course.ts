export type CourseStatus = 'published' | 'draft';

export interface CourseEssentials {
  title: string;
}

export interface CourseOptionals {
  courseId: string;
  slug: string;
  status: CourseStatus;
}

export type CourseProperties = CourseEssentials & Partial<CourseOptionals>;

export class Course {
  private readonly courseId: string | undefined;
  private title: string;
  private slug: string | undefined;
  private status: CourseStatus | undefined;

  constructor(props: CourseProperties) {
    this.title = props.title;
    if (props.courseId) this.courseId = props.courseId;
    if (props.slug) this.slug = props.slug;
    if (props.status) this.status = props.status;
  }

  get properties() {
    return {
      title: this.title,
      courseId: this.courseId,
      slug: this.slug,
      status: this.status,
    };
  }
}
