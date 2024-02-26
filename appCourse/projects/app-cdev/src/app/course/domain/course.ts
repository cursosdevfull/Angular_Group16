import { validate } from 'uuid';

enum STATUS {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

export interface CoursePropsRequired {
  courseId: string;
  title: string;
}

export interface CoursePropsOptional {
  slug: string;
  status: string;
  deletedAt: Date | undefined;
}

export interface CoursePropsUpdate {
  title: string;
  status: string;
}

export type CourseProps = CoursePropsRequired & Partial<CoursePropsOptional>;

export class Course {
  private readonly courseId: string;
  private title: string;
  private slug: string | undefined;
  private status: string;
  private deletedAt: Date | undefined;

  constructor(props: CourseProps) {
    if (!validate(props.courseId)) throw new Error('Invalid courseId');

    if (props.title.length < 3)
      throw new Error('Title must be at least 3 characters long');
    if (props.slug && props.slug.length < 3)
      throw new Error('Slug must be at least 3 characters long');
    if (
      props.status &&
      props.status !== STATUS.DRAFT &&
      props.status !== STATUS.PUBLISHED
    )
      throw new Error('Status must be draft or published');

    this.courseId = props.courseId;
    this.title = props.title;
    if (props.slug) this.slug = props.slug;

    if (props.status) {
      this.status = props.status;
    } else {
      this.status = STATUS.DRAFT;
    }

    if (props.deletedAt) {
      this.deletedAt = props.deletedAt;
    }
  }

  get properties() {
    return {
      courseId: this.courseId,
      title: this.title,
      slug: this.slug,
      status: this.status,
      deletedAt: this.deletedAt,
    };
  }

  update(props: Partial<CoursePropsUpdate>) {
    if (props.title && props.title.length < 3) {
      throw new Error('Title must be at least 3 characters long');
    } else if (props.title) {
      this.title = props.title;
    }

    if (
      props.status &&
      props.status !== STATUS.DRAFT &&
      props.status !== STATUS.PUBLISHED
    ) {
      throw new Error('Status must be draft or published');
    } else if (props.status) {
      this.status = props.status;
    }
  }

  delete() {
    this.deletedAt = new Date();
  }
}
