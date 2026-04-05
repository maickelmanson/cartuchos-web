import { describe, it, expect } from "vitest";
import {
  validarCPF,
  validarCNPJ,
  mascaraCPF,
  mascaraCNPJ,
  removerFormatacao,
} from "./cpfCnpjValidation";

describe("CPF Validation", () => {
  it("deve validar CPF válido", () => {
    expect(validarCPF("11144477735")).toBe(true);
    expect(validarCPF("111.444.777-35")).toBe(true);
  });

  it("deve rejeitar CPF com dígitos verificadores inválidos", () => {
    expect(validarCPF("11144477736")).toBe(false);
    expect(validarCPF("111.444.777-36")).toBe(false);
  });

  it("deve rejeitar CPF com todos os dígitos iguais", () => {
    expect(validarCPF("11111111111")).toBe(false);
    expect(validarCPF("00000000000")).toBe(false);
  });

  it("deve rejeitar CPF com comprimento inválido", () => {
    expect(validarCPF("1234567890")).toBe(false);
    expect(validarCPF("123456789012")).toBe(false);
  });

  it("deve aplicar máscara de CPF corretamente", () => {
    expect(mascaraCPF("11144477735")).toBe("111.444.777-35");
    expect(mascaraCPF("111.444.777-35")).toBe("111.444.777-35");
    expect(mascaraCPF("111")).toBe("111");
  });
});

describe("CNPJ Validation", () => {
  it("deve validar CNPJ válido", () => {
    expect(validarCNPJ("11222333000181")).toBe(true);
    expect(validarCNPJ("11.222.333/0001-81")).toBe(true);
  });

  it("deve rejeitar CNPJ com dígitos verificadores inválidos", () => {
    expect(validarCNPJ("11222333000182")).toBe(false);
    expect(validarCNPJ("11.222.333/0001-82")).toBe(false);
  });

  it("deve rejeitar CNPJ com todos os dígitos iguais", () => {
    expect(validarCNPJ("11111111111111")).toBe(false);
    expect(validarCNPJ("00000000000000")).toBe(false);
  });

  it("deve rejeitar CNPJ com comprimento inválido", () => {
    expect(validarCNPJ("112223330001")).toBe(false);
    expect(validarCNPJ("1122233300018111")).toBe(false);
  });

  it("deve aplicar máscara de CNPJ corretamente", () => {
    expect(mascaraCNPJ("11222333000181")).toBe("11.222.333/0001-81");
    expect(mascaraCNPJ("11.222.333/0001-81")).toBe("11.222.333/0001-81");
    expect(mascaraCNPJ("11222")).toBe("11.222");
  });
});

describe("Format Removal", () => {
  it("deve remover formatação de CPF", () => {
    expect(removerFormatacao("111.444.777-35")).toBe("11144477735");
  });

  it("deve remover formatação de CNPJ", () => {
    expect(removerFormatacao("11.222.333/0001-81")).toBe("11222333000181");
  });

  it("deve remover todos os caracteres não numéricos", () => {
    expect(removerFormatacao("123-456.789/00")).toBe("12345678900");
  });
});
