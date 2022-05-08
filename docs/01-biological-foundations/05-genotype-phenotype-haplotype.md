---
title: Genotype, Phenotype and Haplotype
track: Biological Foundations
---

## Genotype

**Genotype** is an overloaded term that can mean one of two things:

- Most commonly within the area of computational genomics, genotype refers to the
  particular alleles found a given position or locus within the genome. So, for
  instance, if position 7 on the theoretical chromosome below contains an `A` on one
  copy and a `G` on the other copy. This is said to be a genotype call of `A/G`.
- Less commonly within the area of computational genomics, the genotype will be
  referencing an organism's complete set of genetic material.  

Which definition is implied is largely based on the context of the conversation: if one
is talking about a system-wide effect that is likely to be caused by the complicated
interaction(s) between various parts of the organism's genetic code, then the second
definition is more suited. Within computational genomics, we are often concerned with
highly focal changes, hence the preference of the first definition above. 

:::info 
Throughout this guide, we'll assume the first definition for genotype unless otherwise
specified.
:::

## Phenotype

Moving along, an observed (often physical) trait that specific genes confer is known as
a **phenotype**. When we see a person with blue eyes (a phenotype), we know that they
carry a set specific genetic sequences that makes that eye color possible (a genotype).
In cancer, the features of the disease are the phenotype and the mutations and variants
make up the genotype. In genomics, biologists seek to link genotypes to phenotypes to
improve diagnoses and understand how cancer works. This phenomenon is known as a
**genotype-phenotype relationship**.

## Haplotype

Recall that each human genome is composed of pairs of chromosomes, one inherited from
each parent. That means, with a few exceptions, nearly every gene has two copies. Often
the two DNA sequences of that encoded gene differ. Each distinct copy is
a **haplotype** for that gene. Together the two haplotypes make up the genotype, and the
proteins they produce determines the phenotype. A variant is often detected on only one
copy of the gene. If the variant causes a loss of function in an important gene, that
one mutation may be insufficient to cause cancer but may create a predisposition to
cancer later in life.

![Figure showing the relationship between a genotype, a phenotype, and a haplotype](../images/1.7-genotype-phenotype-haplotype.jpg)

