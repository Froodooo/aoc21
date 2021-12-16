// import { chunk } from "https://deno.land/std@0.108.0/collections/mod.ts";

const input = await Deno.readTextFile("./day16/day16_ex.txt");
let transmission = toBinary(input).split("");

const VERSION_LENGTH = 3;
const TYPE_LENGTH = 3;
const LITERAL_PACKET_GROUP_LENGTH = 5;
const LITERAL_PACKET_MULTIPLE = 4;

enum Type {
  Literal,
  Operator,
}

class Packet {
  version: number;
  typeId: number;
  type: Type;

  constructor(version: number, typeId: number) {
    this.version = version;
    this.typeId = typeId;
    this.type = this.typeId === 4 ? Type.Literal : Type.Operator;
  }
}

class LiteralPacket extends Packet {
  literal: number;

  constructor(version: number, typeId: number) {
    super(version, typeId);

    this.literal = this.readLiteralPacket();
  }

  private readLiteralPacket(): number {
    let group: string[];
    let groupCount = 0;
    let bits = "";

    do {
      group = transmission.splice(0, 5);
      bits += group.slice(1).join("");
      groupCount += 1;
    } while (group[0] == "1");

    const literal = parseInt(bits, 2);

    this.discardBits(groupCount);

    return literal;
  }

  private discardBits(groupCount: number) {
    const packetLength = VERSION_LENGTH + TYPE_LENGTH +
      (groupCount * LITERAL_PACKET_GROUP_LENGTH);
    const toDiscard = LITERAL_PACKET_MULTIPLE -
      (packetLength % LITERAL_PACKET_MULTIPLE);
    transmission = transmission.splice(toDiscard);
  }
}

// https://stackoverflow.com/questions/45053624/convert-hex-to-binary-in-javascript
function hex2bin(hex: string): string {
  return (parseInt(hex, 16).toString(2)).padStart(4, "0");
}

function toBinary(hex: string): string {
  return hex.split("").map((h) => hex2bin(h)).join("");
}

function readPackets(): Packet {
  const version = parseInt(transmission.splice(0, 3).join(""), 2);
  const type = parseInt(transmission.splice(0, 3).join(""), 2);
  const packet = new Packet(version, type);

  switch (packet.type) {
    case Type.Literal:
      return new LiteralPacket(packet.version, packet.typeId);
    default:
      return packet;
  }
}

function solve(): number {
  console.log(readPackets());

  return 42;
}

solve();
