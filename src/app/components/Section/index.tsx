import Image from "next/image";
import styles from "./style.module.css";

interface SectionProps {
  title: string;
  content?: string;
  options?: {
    key: number;
    value: string;
  }[];
  image?: {
    url: string;
    width: number;
    height: number;
  };
}

const Section = ({
  className,
  props,
  handleClick,
}: {
  className?: string;
  props: SectionProps;
  handleClick: (key: number) => void;
}) => {
  const { title, content, options, image } = props;

  return (
    <section className={`${styles.section} ${className ? className : ""}`}>
      <h1 className={styles.title}>{title}</h1>
      {content && (
        <p
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        ></p>
      )}
      {image && (
        <div className={styles.imageContainer}>
          <Image
            src={image.url}
            alt="image"
            width={image.width}
            height={image.height}
            className={styles.image}
          />
        </div>
      )}
      {options &&
        options.map((option, index) => (
          <div
            key={index}
            className={styles.option}
            onClick={(e) => {
              e.preventDefault();
              handleClick(option.key);
            }}
          >
            {option.value}
          </div>
        ))}
    </section>
  );
};

export default Section;
