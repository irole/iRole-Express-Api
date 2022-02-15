import fs from 'fs';

export default function translate(req, path, key: string, value: string) {

    let address = path.replace(process.cwd(), '').replace(/[\\]/g, '.').substring(7);
    address = address.substring(0, address.length - 3);

    address = `${address}.${key}`;
    req.__(`${address}:${value}`);
    if (req.__l(address)[0] !== value) {
        let data: any = fs.readFileSync('./resource/lang/en.json');
        let json: any = JSON.parse(data);
        setValue(json, address, value);
        fs.writeFileSync('./resource/lang/en.json', JSON.stringify(json, null, 2));
        return req.__(address);
    }
    return req.__(address);

}

function setValue(object, path, value) {
    let way = path.replace(/\[/g, '.').replace(/\]/g, '').split('.'),
        last = way.pop();

    way.reduce(function (o, k, i, kk) {
        return o[k] = o[k] || (isFinite(i + 1 in kk ? kk[i + 1] : last) ? [] : {});
    }, object)[last] = value;
}
