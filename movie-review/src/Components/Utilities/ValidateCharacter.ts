import * as Yup from 'yup'

export const ValidateCharacter = () => {
    return Yup.addMethod(Yup.string, 'firstLetterUppercase', function () {
        return this.test('first-letter-uppercase', 'In hoa chữ cái đầu', (e) => {
            if (e && e.length > 0) {
                const firstLetter = e.substring(0, 1);
                return firstLetter === firstLetter.toUpperCase();
            }
            return true;
        })
    });
}