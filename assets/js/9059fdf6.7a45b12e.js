"use strict";(self.webpackChunklearngenomics_dev=self.webpackChunklearngenomics_dev||[]).push([[355],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var o=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,i=function(e,t){if(null==e)return{};var n,o,i={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=o.createContext({}),l=function(e){var t=o.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=l(e.components);return o.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=l(n),f=i,g=d["".concat(c,".").concat(f)]||d[f]||m[f]||a;return n?o.createElement(g,r(r({ref:t},p),{},{components:n})):o.createElement(g,r({ref:t},p))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,r=new Array(a);r[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:i,r[1]=s;for(var l=2;l<a;l++)r[l]=n[l];return o.createElement.apply(null,r)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9824:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return c},default:function(){return f},frontMatter:function(){return s},metadata:function(){return l},toc:function(){return m}});var o=n(7462),i=n(3366),a=(n(7294),n(3905)),r=["components"],s={},c="Compression and BGZF",l={unversionedId:"genomic-file-formats/compression-and-BGZF",id:"genomic-file-formats/compression-and-BGZF",title:"Compression and BGZF",description:'The BGZF compression technique and associated\xa0bgzip/tabix\xa0tools were developed as general purpose utilities to enable random access lookup in compressed tab-delimited text files. By default, the\xa0gzip\xa0compression algorithm creates a single stream of data---accessing information in the middle of that compressed stream requires decompressing the stream from the beginning. Genomic files tend to be substantial in size, so decompressing an entire file to retrieve information is a waste of time and resources. The BGZF compression technique solves this problem by creating multiple gzip streams as contiguous "blocks" and storing the offsets to each block in an associated\xa0index file. In this case, you can retrieve a subset of information from the file by seeking past all of the irrelevant BGZF blocks (avoiding the associated computational overhead) and only decompressing the block that contains the information you want.',source:"@site/docs/04-genomic-file-formats/01-compression-and-BGZF.md",sourceDirName:"04-genomic-file-formats",slug:"/genomic-file-formats/compression-and-BGZF",permalink:"/docs/genomic-file-formats/compression-and-BGZF",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/04-genomic-file-formats/01-compression-and-BGZF.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Genomic File Formats",permalink:"/docs/genomic-file-formats/"},next:{title:"FASTQ Files",permalink:"/docs/genomic-file-formats/FASTQ-files"}},p={},m=[{value:"Comparison with Gzip",id:"comparison-with-gzip",level:2}],d={toc:m};function f(e){var t=e.components,s=(0,i.Z)(e,r);return(0,a.kt)("wrapper",(0,o.Z)({},d,s,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"compression-and-bgzf"},"Compression and BGZF"),(0,a.kt)("p",null,"The BGZF compression technique and associated\xa0",(0,a.kt)("a",{parentName:"p",href:"http://www.htslib.org/doc/bgzip.html"},"bgzip"),"/",(0,a.kt)("a",{parentName:"p",href:"https://www.htslib.org/doc/tabix.html"},"tabix"),'\xa0tools were developed as general purpose utilities to enable random access lookup in compressed tab-delimited text files. By default, the\xa0gzip\xa0compression algorithm creates a single stream of data---accessing information in the middle of that compressed stream requires decompressing the stream from the beginning. Genomic files tend to be substantial in size, so decompressing an entire file to retrieve information is a waste of time and resources. The BGZF compression technique solves this problem by creating multiple gzip streams as contiguous "blocks" and storing the offsets to each block in an associated\xa0',(0,a.kt)("strong",{parentName:"p"},"index file"),". In this case, you can retrieve a subset of information from the file by seeking past all of the irrelevant BGZF blocks (avoiding the associated computational overhead) and only decompressing the block that contains the information you want."),(0,a.kt)("p",null,"Consider a single, bgzipped BAM file with the name\xa0Sample.bam. This file will typically be accompanied by an index called\xa0Sample.bam.bai, which contains offsets to the BGZF blocks. These two files are often treated as a pair."),(0,a.kt)("p",null,'For more information, see "The BGZF compression format" section in\xa0',(0,a.kt)("a",{parentName:"p",href:"http://samtools.github.io/hts-specs/SAMv1.pdf"},"the SAM file specification"),"."),(0,a.kt)("h2",{id:"comparison-with-gzip"},"Comparison with Gzip"),(0,a.kt)("p",null,"Below is a simple comparison of\xa0gzip\xa0versus\xa0bgzip\xa0to illustrate the trade-off. Note that while\xa0gzip\xa0achieves a slight edge in compression ratio, the\xa0bgzip/tabix\xa0pair is vastly superior in lookup time. This non-linear trade-off between compression and random-access speed is why BGZF is pervasive in the field of computational genomics."),(0,a.kt)("p",null,(0,a.kt)("img",{src:n(1535).Z,width:"1500",height:"620"})),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'GENCODE_GTF="ftp://ftp.ebi.ac.uk/pub/databases/gencode/Gencode_human/release_32/gencode.v32.chr_patch_hapl_scaff.annotation.gtf.gz"\n\ncurl "$GENCODE_GTF" \\                        # Download GTF\n  | gunzip \\                                 # Decompress\n  | grep -v "^#" \\                           # Remove header lines\n  | sort -k1,1 -k4,4n > gencode.v32.all.gtf  # Sort by chromosome name then genomic start lcocation (numerically)\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"gzip -c gencode.v32.all.gtf > gencode.v32.all.gtf.gzipped\nbgzip -c gencode.v32.all.gtf > gencode.v32.all.gtf.bgzipped\n\nls -lah\n# Permissions Size User    Date Modified Name\n# .rw-r--r--  1.4G cmcleod  8 May 23:31  gencode.v32.all.gtf\n# .rw-r--r--   61M cmcleod  8 May 23:32  gencode.v32.all.gtf.bgzipped\n# .rw-r--r--   48M cmcleod  8 May 23:32  gencode.v32.all.gtf.gzipped\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"tabix -p gff gencode.v32.all.gtf.gzipped\n# [tabix] was bgzip used to compress this file? gencode.v32.all.gtf.gzipped\n\ntabix -p gff gencode.v32.all.gtf.bgzipped\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},'time (zgrep "gene_name=NOTCH1" gencode.v32.all.gtf.gzipped &> /dev/null)\n\n# ( zgrep "gene_name=NOTCH1" gencode.v32.all.gtf.gzipped &> /dev/null; )  20.60s user 0.05s system 99% cpu 20.693 total\n\ntime (tabix gencode.v32.all.gtf.bgzipped chr9:136,496,070-136,545,786 &> /dev/null)\n\n# ( tabix gencode.v32.all.gtf.bgzipped chr9:136,496,070-136,545,786 &> /dev/nul)  0.01s user 0.00s system 83% cpu 0.018 total\n')))}f.isMDXComponent=!0},1535:function(e,t,n){t.Z=n.p+"assets/images/7.1-GZIP-BGZF-5c23f2c8afaa746f11cfc9e219652321.jpg"}}]);