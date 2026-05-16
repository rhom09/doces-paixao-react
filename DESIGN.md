---
name: Doces Paixão
description: Confeitaria Artesanal Sofisticada
colors:
  primary: "#c4566b"
  primary-deep: "#a8395a"
  primary-light: "#f2c0cb"
  secondary: "#4dbfb4"
  secondary-deep: "#329e93"
  secondary-light: "#b2e8e4"
  ink: "#271620"
  cream: "#fdfaf7"
  canvas: "#faf7f4"
  border: "#eddde5"
typography:
  display:
    fontFamily: "Cormorant Garamond, serif"
    fontWeight: 600
    lineHeight: 1.1
  body:
    fontFamily: "DM Sans, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "4px"
  md: "8px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "32px"
  lg: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "12px 32px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
  card:
    backgroundColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Doces Paixão

## 1. Overview

**Creative North Star: "A Vitrine Encantada"**

Este sistema visual foi desenhado para evocar a sofisticação e o encantamento de uma confeitaria de alto padrão. Através do uso de tipografia serifada clássica em harmonia com uma paleta de tons pastéis e "ink" (cereja profundo), criamos um ambiente que é ao mesmo tempo acolhedor e luxuoso. Rejeitamos explicitamente estéticas industriais ou de fast-food, priorizando a delicadeza artesanal em cada detalhe.

**Key Characteristics:**
- **Suavidade Curvilínea:** Uso extensivo de formas arredondadas para transmitir acolhimento.
- **Contraste Elegante:** Tipografia de exibição generosa contra fundos limpos ("Cream").
- **Elevação Etérea:** Sombras suaves que conferem profundidade sem pesar no visual.

## 2. Colors

A paleta é centrada em tons de Rose e Mint, equilibrados pelo calor do Cream e a profundidade do Ink.

### Primary
- **Rose Passion** (#c4566b): A cor assinatura. Usada para CTAs principais e elementos de destaque que guiam o olhar.

### Secondary
- **Mint Fresh** (#4dbfb4): Cor de acento secundária, usada para trazer frescor e equilíbrio visual à predominância do Rose.

### Neutral
- **Deep Ink** (#271620): Usada para textos e sombras, substituindo o preto puro por um tom mais orgânico e sofisticado.
- **Silky Cream** (#fdfaf7): O fundo principal das seções, mais suave e convidativo que o branco puro.

**The Rarity Rule.** O Rose Passion é usado em ≤10% da tela. Sua raridade é o que confere o status de destaque e sofisticação.

## 3. Typography

**Display Font:** Cormorant Garamond (Serif)
**Body Font:** DM Sans (Sans-serif)

**Character:** Um par clássico que equilibra a tradição da caligrafia serifada com a legibilidade moderna da sans-serif geométrica.

### Hierarchy
- **Display** (600, 2.5rem-4.5rem, 1.1): Títulos de seções e frases de impacto.
- **Headline** (600, 1.875rem, 1.2): Subtítulos e títulos de cards.
- **Body** (400, 1rem, 1.6): Textos descritivos e informativos. Máximo de 75ch.
- **Label** (500, 0.875rem, uppercase): Pequenas tags e rótulos auxiliares.

## 4. Elevation

O sistema utiliza sombras suaves e profundas baseadas no tom Ink, criando uma sensação de camadas etéreas e flutuantes.

### Shadow Vocabulary
- **Soft Glow** (`0 8px 32px rgba(39,22,32,0.09)`): Usada em cards e elementos em repouso.
- **Lifted State** (`0 20px 60px rgba(39,22,32,0.13)`): Aplicada durante estados de hover para simular interação.

**The Floating Rule.** Elementos interativos nunca estão "colados" ao fundo. Eles flutuam levemente, respondendo ao cursor do usuário com elevação adicional.

## 5. Components

### Buttons
- **Shape:** Completamente arredondado (rounded-full).
- **Primary:** Fundo Rose, texto Branco, com sombra de brilho rosa.
- **Hover:** Transição suave para Rose Deep com leve elevação negativa (-translate-y).

### Cards
- **Corner Style:** 28px (4xl) para grandes seções, 16px (2xl) para cards de produtos.
- **Background:** Branco Puro ou Cream dependendo do contexto.
- **Internal Padding:** 24px a 40px para garantir respiro visual.

## 6. Do's and Don'ts

### Do:
- **Do** usar o gradiente "Rose-Mint" apenas em textos de destaque muito pontuais.
- **Do** manter margens generosas entre seções para preservar a "Vitrine Encantada".
- **Do** usar o tom Ink para textos, nunca Preto puro (#000).

### Don't:
- **Don't** usar cores saturadas ou neon que quebrem a harmonia artesanal (visto no PRODUCT.md).
- **Don't** usar bordas duras ou ângulos retos em botões interativos.
- **Don't** sobrecarregar seções com muitos ícones; deixe a fotografia do produto brilhar.
