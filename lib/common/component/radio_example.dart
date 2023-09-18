import 'package:flutter/material.dart';

enum SingingCharacter { men, women }

class RadioExample extends StatefulWidget {
  const RadioExample({super.key});

  @override
  State<RadioExample> createState() => _RadioExampleState();
}

class _RadioExampleState extends State<RadioExample> {
  SingingCharacter? _character = SingingCharacter.men;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        Expanded(
          child: ListTile(
            contentPadding: const EdgeInsets.all(0),
            horizontalTitleGap: 0,
            title: const Text('남'),
            leading: Radio<SingingCharacter>(
              value: SingingCharacter.men,
              groupValue: _character,
              onChanged: (SingingCharacter? value) {
                setState(() {
                  _character = value;
                });
              },
            ),
          ),
        ),
        Expanded(
          child: ListTile(
            contentPadding: const EdgeInsets.only(left: 0),
            horizontalTitleGap: 0,
            title: const Text('여'),
            leading: Radio<SingingCharacter>(
              value: SingingCharacter.women,
              groupValue: _character,
              onChanged: (SingingCharacter? value) {
                setState(() {
                  _character = value;
                });
              },
            ),
          ),
        ),
      ],
    );
  }
}
