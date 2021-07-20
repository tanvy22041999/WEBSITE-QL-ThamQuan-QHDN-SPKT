export class BarcodeResult {
  codeResult: CodeResult;
  line: Line[];
  angle: number;
  pattern: number[];
  box: Array<number[]>;
  boxes: Array<number[]>;
}

export class Line {
  x: number;
  y: number;
}

export class CodeResult {
  code: string;
  start: number;
  end: number;
  startInfo: {
    start: number;
    end: number;
  };
  decodedCodes: string[];
  format: string;
  direction: number;
}
