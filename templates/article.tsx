import React from 'react';
import {Variable as V, Validator, Static} from '@flayyer/variables';
import {TemplateProps} from '@flayyer/flayyer-types';
import inRange from 'lodash/inRange';
import sample from 'lodash/sample';

import '../styles/tailwind.css';

import img1 from '../static/img1.jpg';
import img2 from '../static/img2.jpg';
import img3 from '../static/img3.jpg';
import img4 from '../static/img4.jpg';
import img5 from '../static/img5.jpg';

import {Layer} from '../components/layers';
import clsx from 'clsx';

/**
 * Export to enable variables UI on Flayyer.com
 */
export const schema = V.Object({
  title: V.String({
    default: 'Flayyer blog entry'
  }),
  image: V.Optional(
    V.Image({
      title: 'Background image URL',
      examples: [img5, img4, img3, img2, img1]
    })
  )
});
type Variables = Static<typeof schema>;

const validator = new Validator(schema);

// Make sure to 'export default' a React component
export default function MainTemplate(props: TemplateProps<Variables>) {
  const {width, height, variables, locale = 'en'} = props;
  if (!validator.validate(variables)) {
    return <img className="w-full h-full object-cover" src={img1} />; // Fallback for invalid variables
  }

  const {title, image: selectedImage} = variables;
  const image: string =
    selectedImage || sample(schema.properties.image.examples);

  const date = new Date();
  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const author = 'Patricio Lopez';

  return (
    <Layer className="relative w-full h-full antialiased overflow-hidden">
      <Layer className="bg-white p-2 sq:p-4">
        <img
          className="w-full h-full object-cover rounded-md filter drop-shadow-2xl contrast-75 brightness-90"
          src={image}
        />
      </Layer>
      <Layer
        className={clsx([
          'hidden',
          'banner:flex flex-col items-center justify-center p-8 flex-nowrap text-center'
        ])}
      >
        <time
          dateTime={date.toISOString()}
          className="flex-none text-sm text-gray-100 font-semibold tracking-wide uppercase text-shadow-md"
        >
          {formatter.format(date)}
        </time>

        {title && (
          <h1
            className={clsx([
              'flex-shrink-1',
              'font-extrabold tracking-tight text-white text-shadow-md',
              'line-clamp-3 sq:line-clamp-5 story:line-clamp-none',
              {
                // TODO: Use fit-text or something.
                'text-3xl sq:text-4xl': inRange(title.length, 0, 40),
                'text-2xl sq:text-3xl': inRange(title.length, 40, 80),
                'text-xl sq:text-2xl': inRange(title.length, 80, 120),
                'text-lg sq:text-xl': inRange(
                  title.length,
                  120,
                  Number.POSITIVE_INFINITY
                )
              }
            ])}
          >
            {title}
          </h1>
        )}

        {author && (
          <span className="mt-1 flex-none text-base font-semibold tracking-tight text-gray-100 text-shadow-md">
            By {author}
          </span>
        )}
      </Layer>
    </Layer>
  );
}
