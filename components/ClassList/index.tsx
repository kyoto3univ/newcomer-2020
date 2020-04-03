import React from 'react';
import { ClassCard } from '../ClassCard';

type Props = {
  classes: Array<{
    title: string;
    description: string;
    hour: number;
    link: string;
  }>;
};
export const ClassList = ({ classes }: Props) => {
  return (
    <>
      {classes.map((item) => (
        <ClassCard key={item.link} {...item} />
      ))}
    </>
  );
};
