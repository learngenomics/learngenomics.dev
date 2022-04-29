---
title: Worked Example
track: Engineering Ecosystem
---

The following guide is intended to be a simple end-to-end workflow you can run
at home to understand some of the core concepts in this guide. The entire
analysis was performed on a machine with the following specs:

- **CPU** — Intel Core i7-9700K CPU @ 3.60GHz (8 cores)
- **RAM** — 2x16GB Corsair Vengeance DDR4 3000MHz
- **SSD** — Samsung 860 EVO 1TB SATA III

Additionally, you will need the following minimum requirements to complete this
exercise.

- ~60GB of free disk space.
- 8GB+ of RAM.

## Environment

We use [anaconda](https://anaconda.com) and more specifically
[bioconda](https://bioconda.github.io/) for simple dependency management. Please
follow the [installation
instructions](https://docs.anaconda.com/anaconda/install/) and
bootstrap your environment by running the following commands:

```bash{numberLines: 1}
conda create -n worked-example -c bioconda bcftools==1.9 bwa==0.7.17 fastqc==0.11.8 samtools==1.9 picard==2.21.2 -y
conda activate worked-example

cargo install --git https://github.com/stjude/fqlib.git
```

## Acquire sequencing data

Next, you'll need some sequencing data. The [1000 genomes
project](https://www.internationalgenome.org/) graciously hosts all of the FASTQ
files generated as part of the project for the public to download. Typically,
one might combine multiple FASTQ files from the same sample together to have
sufficient of evidence for calls (you can view an example directory of files
[here](ftp://ftp.1000genomes.ebi.ac.uk/vol1/ftp/phase3/data/HG00133/sequence_read/)).
To keep computation time small for this example, we will download only a single
pair of FASTQ files.

```bash
wget ftp://ftp.1000genomes.ebi.ac.uk/vol1/ftp/phase3/data/HG00133/sequence_read/SRR038564_{1,2}.filt.fastq.gz
```

## Verifying sequencing data

Once you've downloaded the file, it's a good idea to run some quick sanity
checks. Here, we use `fq lint` to ensure the FASTQ pair is well-formed and
`fastqc` to see how well the sequencing experiment went.

```bash
fq lint SRR038564_1.filt.fastq.gz SRR038564_2.filt.fastq.gz && echo 'Successfully verified FASTQs.' || echo 'Failed to verify FASTQs!'
# Successfully verified FASTQs.

fastqc -t `nproc` SRR038564_1.filt.fastq.gz SRR038564_2.filt.fastq.gz
# Started analysis of SRR038564_1.filt.fastq.gz
# Started analysis of SRR038564_2.filt.fastq.gz
# Approx 5% complete for SRR038564_1.filt.fastq.gz
# Approx 5% complete for SRR038564_2.filt.fastq.gz
#
# ----------------------
# | Abbreviated output |
# ----------------------
#
# Approx 95% complete for SRR038564_1.filt.fastq.gz
# Approx 95% complete for SRR038564_2.filt.fastq.gz
# Analysis complete for SRR038564_1.filt.fastq.gz
# Analysis complete for SRR038564_2.filt.fastq.gz

open SRR038564_{1,2}.filt_fastqc.html
```

## Download the reference genome

Now that we have our sequencing data, we'll need to download the reference
genome which our analyses will be based off of. In this case, we will use the
`GRCh38_no_alt` analysis set.

```bash
wget ftp://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/000/001/405/GCA_000001405.15_GRCh38/seqs_for_alignment_pipelines.ucsc_ids/GCA_000001405.15_GRCh38_no_alt_analysis_set.fna.gz -O GRCh38_no_alt.fa.gz
gunzip GRCh38_no_alt.fa.gz
```

## Index the reference genome

Once you've downloaded the reference FASTA, you'll need to create the data
structure needed for the `bwa` alignment algorithm. You can do this by running
the `bwa index` command:

```bash
bwa index GRCh38_no_alt.fa
# [bwa_index] Pack FASTA... 22.93 sec
# [bwa_index] Construct BWT for the packed sequence...
# [BWTIncCreate] textLength=6199845082, availableWord=448243540
# [BWTIncConstructFromPacked] 10 iterations done. 99999994 characters processed.
# [BWTIncConstructFromPacked] 20 iterations done. 199999994 characters processed.
# [BWTIncConstructFromPacked] 30 iterations done. 299999994 characters processed.
#
# ----------------------
# | Abbreviated output |
# ----------------------
#
# [BWTIncConstructFromPacked] 680 iterations done. 6184133946 characters processed.
# [bwt_gen] Finished constructing BWT in 688 iterations.
# [bwa_index] 1753.46 seconds elapse.
# [bwa_index] Update BWT... 11.90 sec
# [bwa_index] Pack forward-only FASTA... 17.86 sec
# [bwa_index] Construct SA from BWT and Occ... 780.19 sec
# [main] Version: 0.7.17-r1188
# [main] CMD: bwa index GRCh38_no_alt.fa
# [main] Real time: 2597.464 sec; CPU: 2586.355 sec
```

## Aligning reads

With your reads downloaded and your reference files prepared, you are now ready
to align reads to the human genome.

```bash
bwa mem -t `nproc` GRCh38_no_alt.fa SRR038564_1.filt.fastq.gz SRR038564_2.filt.fastq.gz > SRR038564.bwa-mem.sam
# [M::bwa_idx_load_from_disk] read 0 ALT contigs
# [M::process] read 1052632 sequences (80000032 bp)...
# [M::process] read 1052632 sequences (80000032 bp)...
# [M::mem_pestat] # candidate unique pairs for (FF, FR, RF, RR): (5, 366049, 20, 5)
# [M::mem_pestat] skip orientation FF as there are not enough pairs
# [M::mem_pestat] analyzing insert size distribution for orientation FR...
# [M::mem_pestat] (25, 50, 75) percentile: (379, 414, 428)
# [M::mem_pestat] low and high boundaries for computing mean and std.dev: (281, 526)
# [M::mem_pestat] mean and std.dev: (415.82, 26.23)
# [M::mem_pestat] low and high boundaries for proper pairs: (232, 575)
# [M::mem_pestat] analyzing insert size distribution for orientation RF...
# [M::mem_pestat] (25, 50, 75) percentile: (84, 168, 372)
# [M::mem_pestat] low and high boundaries for computing mean and std.dev: (1, 948)
# [M::mem_pestat] mean and std.dev: (166.47, 127.04)
# [M::mem_pestat] low and high boundaries for proper pairs: (1, 1236)
# [M::mem_pestat] skip orientation RR as there are not enough pairs
# [M::mem_pestat] skip orientation RF
# [M::mem_process_seqs] Processed 1052632 reads in 232.390 CPU sec, 30.295 real sec
#
# ----------------------
# | Abbreviated output |
# ----------------------
#
# [M::mem_process_seqs] Processed 778766 reads in 167.751 CPU sec, 21.112 real sec
# [main] Version: 0.7.17-r1188
# [main] CMD: bwa mem -t 8 GRCh38_no_alt.fa SRR038564_1.filt.fastq.gz SRR038564_2.filt.fastq.gz
# [main] Real time: 1045.858 sec; CPU: 8226.046 sec
```

## Postprocessing

Once alignment has finished, you will want to do the following steps:

### Coordinate sort

```bash
samtools sort SRR038564.bwa-mem.sam > SRR038564.bwa-mem.sorted.bam
# [bam_sort_core] merging from 10 files and 1 in-memory blocks...
```

### Mark duplicates

```bash
picard MarkDuplicates I=SRR038564.bwa-mem.sorted.bam O=SRR038564.bwa-mem.sorted.marked.bam M=SRR038564.bwa-mem.sorted.marked.bam.metrics
# INFO	2019-11-09 23:55:27	MarkDuplicates
#
# ********** NOTE: Picard's command line syntax is changing.
# **********
# ********** For more information, please see:
# ********** https://github.com/broadinstitute/picard/wiki/Command-Line-Syntax-Transition-For-Users-(Pre-Transition)
# **********
# ********** The command line looks like this in the new syntax:
# **********
# **********    MarkDuplicates -I SRR038564.bwa-mem.sorted.bam -O SRR038564.bwa-mem.sorted.marked.bam -M SRR038564.bwa-mem.sorted.marked.bam.metric
# **********
#
#
# 23:55:27.730 INFO  NativeLibraryLoader - Loading libgkl_compression.so from jar:file:/home/claymcleod/anaconda3/envs/bio/share/picard-2.21.2-0/picard.jar!/com/intel/gkl/native/libgkl_compression.so
# [Sat Nov 09 23:55:27 CST 2019] MarkDuplicates INPUT=[SRR038564.bwa-mem.sorted.bam] OUTPUT=SRR038564.bwa-mem.sorted.marked.bam METRICS_FILE=SRR038564.bwa-mem.sorted.marked.bam.metric    MAX_SEQUENCES_FOR_DISK_READ_ENDS_MAP=50000 MAX_FILE_HANDLES_FOR_READ_ENDS_MAP=8000 SORTING_COLLECTION_SIZE_RATIO=0.25 TAG_DUPLICATE_SET_MEMBERS=false REMOVE_SEQUENCING_DUPLICATES=false TAGGING_POLICY=DontTag CLEAR_DT=true DUPLEX_UMI=false ADD_PG_TAG_TO_READS=true REMOVE_DUPLICATES=false ASSUME_SORTED=false DUPLICATE_SCORING_STRATEGY=SUM_OF_BASE_QUALITIES PROGRAM_RECORD_ID=MarkDuplicates PROGRAM_GROUP_NAME=MarkDuplicates READ_NAME_REGEX=<optimized capture of last three ':' separated fields as numeric values> OPTICAL_DUPLICATE_PIXEL_DISTANCE=100 MAX_OPTICAL_DUPLICATE_SET_SIZE=300000 VERBOSITY=INFO QUIET=false VALIDATION_STRINGENCY=STRICT COMPRESSION_LEVEL=5 MAX_RECORDS_IN_RAM=500000 CREATE_INDEX=false CREATE_MD5_FILE=false GA4GH_CLIENT_SECRETS=client_secrets.json USE_JDK_DEFLATER=false USE_JDK_INFLATER=false
# [Sat Nov 09 23:55:27 CST 2019] Executing as claymcleod@clay-desktop on Linux 5.0.0-32-generic amd64; OpenJDK 64-Bit Server VM 1.8.0_152-release-1056-b12; Deflater: Intel; Inflater: Intel; Provider GCS is not available; Picard version: 2.21.2-SNAPSHOT
# INFO	2019-11-09 23:55:27	MarkDuplicates	Start of doWork freeMemory: 502091736; totalMemory: 514850816; maxMemory: 954728448
# INFO	2019-11-09 23:55:27	MarkDuplicates	Reading input file and constructing read end information.
# INFO	2019-11-09 23:55:27	MarkDuplicates	Will retain up to 3459161 data points before spilling to disk.
# WARNING	2019-11-09 23:55:27	AbstractOpticalDuplicateFinderCommandLineProgram	A field field parsed out of a read name was expected to contain an integer and did not. Read name: SRR038564.671400. Cause: String 'SRR038564.671400' did not start with a parsable number.
# INFO	2019-11-09 23:55:30	MarkDuplicates	Read     1,000,000 records.  Elapsed time: 00:00:02s.  Time for last 1,000,000:    2s.  Last read position: chr1:81,034,799
# INFO	2019-11-09 23:55:30	MarkDuplicates	Tracking 20709 as yet unmatched pairs. 1329 records in RAM.
# INFO	2019-11-09 23:55:32	MarkDuplicates	Read     2,000,000 records.  Elapsed time: 00:00:04s.  Time for last 1,000,000:    2s.  Last read position: chr1:167,422,460
# INFO	2019-11-09 23:55:32	MarkDuplicates	Tracking 42081 as yet unmatched pairs. 1540 records in RAM.
# INFO	2019-11-09 23:55:35	MarkDuplicates	Read     3,000,000 records.  Elapsed time: 00:00:07s.  Time for last 1,000,000:    2s.  Last read position: chr2:5,004,404
#
# ----------------------
# | Abbreviated output |
# ----------------------
#
# INFO	2019-11-09 23:57:09	MarkDuplicates	Read    34,000,000 records.  Elapsed time: 00:01:41s.  Time for last 1,000,000:    2s.  Last read position: chrX:127,198,460
# INFO	2019-11-09 23:57:09	MarkDuplicates	Tracking 61894 as yet unmatched pairs. 6106 records in RAM.
# INFO	2019-11-09 23:57:13	MarkDuplicates	Read 34964531 records. 0 pairs never matched.
# INFO	2019-11-09 23:57:14	MarkDuplicates	After buildSortedReadEndLists freeMemory: 1043659632; totalMemory: 1054343168; maxMemory: 1054343168
# INFO	2019-11-09 23:57:14	MarkDuplicates	Will retain up to 32948224 duplicate indices before spilling to disk.
# INFO	2019-11-09 23:57:14	MarkDuplicates	Traversing read pair information and detecting duplicates.
# INFO	2019-11-09 23:57:18	MarkDuplicates	Traversing fragment information and detecting duplicates.
# INFO	2019-11-09 23:57:23	MarkDuplicates	Sorting list of duplicate records.
# INFO	2019-11-09 23:57:23	MarkDuplicates	After generateDuplicateIndexes freeMemory: 787714176; totalMemory: 1062207488; maxMemory: 1062207488
# INFO	2019-11-09 23:57:23	MarkDuplicates	Marking 4432335 records as duplicates.
# INFO	2019-11-09 23:57:23	MarkDuplicates	Found 0 optical duplicate clusters.
# INFO	2019-11-09 23:57:23	MarkDuplicates	Reads are assumed to be ordered by: coordinate
# INFO	2019-11-09 23:58:08	MarkDuplicates	Written    10,000,000 records.  Elapsed time: 00:00:45s.  Time for last 10,000,000:   45s.  Last read position: chr4:174,112,624
# ^[INFO	2019-11-09 23:58:53	MarkDuplicates	Written    20,000,000 records.  Elapsed time: 00:01:30s.  Time for last 10,000,000:   44s.  Last read position: chr10:71,662,147
# INFO	2019-11-09 23:59:39	MarkDuplicates	Written    30,000,000 records.  Elapsed time: 00:02:16s.  Time for last 10,000,000:   46s.  Last read position: chr18:69,528,922
# INFO	2019-11-10 00:00:09	MarkDuplicates	Writing complete. Closing input iterator.
# INFO	2019-11-10 00:00:09	MarkDuplicates	Duplicate Index cleanup.
# INFO	2019-11-10 00:00:09	MarkDuplicates	Getting Memory Stats.
# INFO	2019-11-10 00:00:09	MarkDuplicates	Before output close freeMemory: 1061636408; totalMemory: 1073217536; maxMemory: 1073217536
# INFO	2019-11-10 00:00:09	MarkDuplicates	Closed outputs. Getting more Memory Stats.
# INFO	2019-11-10 00:00:09	MarkDuplicates	After output close freeMemory: 1061636408; totalMemory: 1073217536; maxMemory: 1073217536
# [Sun Nov 10 00:00:09 CST 2019] picard.sam.markduplicates.MarkDuplicates done. Elapsed time: 4.70 minutes.
# Runtime.totalMemory()=1073217536
```

### Index the BAM file

```bash
samtools index SRR038564.bwa-mem.sorted.marked.bam
```

### Sanity Flagstat Check

```bash
samtools flagstat SRR038564.bwa-mem.sorted.marked.bam
# 37653971 + 0 in total (QC-passed reads + QC-failed reads)
# 0 + 0 secondary
# 33085 + 0 supplementary
# 4432335 + 0 duplicates
# 34674582 + 0 mapped (92.09% : N/A)
# 37620886 + 0 paired in sequencing
# 18810443 + 0 read1
# 18810443 + 0 read2
# 27610948 + 0 properly paired (73.39% : N/A)
# 34351548 + 0 with itself and mate mapped
# 289949 + 0 singletons (0.77% : N/A)
# 815158 + 0 with mate mapped to a different chr
# 440386 + 0 with mate mapped to a different chr (mapQ>=5)
```

## Piling up variants

```bash
# You can split these commands up, but the output of the first command is several hundred GB.
bcftools mpileup -Ou SRR038564.bwa-mem.sorted.marked.bam -f GRCh38_no_alt.fa --threads `nproc` | bcftools call -mv > SRR038564.called.vcf
```

## Number of variants

```bash
grep -v "^#" SRR038564.called.vcf | wc -l
# 1391682
```

```bash
bcftools view -i '%QUAL>=20' SRR038564.called.vcf | wc -l
# 279547
```

## Download IGV

https://software.broadinstitute.org/software/igv/download
