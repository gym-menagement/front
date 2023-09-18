import 'package:flutter/material.dart';

void SingleDialog(BuildContext context, Widget contents) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.all(
            Radius.circular(8),
          ),
        ),
        contentPadding: const EdgeInsets.fromLTRB(50, 20, 20, 70),
        content: contents,
      );
    },
  );
}
