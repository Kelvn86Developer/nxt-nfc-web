import {
    createClient,
    createImageUrlBuilder,
} from 'next-sanity';
import {createPortableTextComponent as portableText} from '@portabletext/react';
import { definePreview} from 'next-sanity/preview';
import imageUrlBuilder from '@sanity/image-url';

const config = {
    projectId: "qcesrzvv",
    dataset: "production",
    apiVersion: "2021-10-21",
    useCdn: false,

}
export const sanityClient = createClient(config);

export const usePreviewSubscription = definePreview(config); 

export const urlFor = (source)=> imageUrlBuilder(config).image(source);

// export const PortableText = createPortableTextComponent({...config,serializers:{}});
