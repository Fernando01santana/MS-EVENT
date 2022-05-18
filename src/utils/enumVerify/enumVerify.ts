export default class EnumVerify {
  verify(type, typeEnum) {
    let acessLevelSave = null;
    for (const key in typeEnum) {
      if (Object.prototype.hasOwnProperty.call(typeEnum, key)) {
        const element = typeEnum[key];
        if (element === type[0]) {
          acessLevelSave = element;
        }
      }
    }
    return acessLevelSave;
  }
}
