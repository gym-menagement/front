import 'package:flutter/material.dart';

void ActionDialog(BuildContext context, Widget contents, Widget action) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.all(
            Radius.circular(8),
          ),
        ),
        contentPadding: const EdgeInsets.fromLTRB(50, 20, 20, 20),
        actionsPadding: const EdgeInsets.only(bottom: 30),
        content: contents,
        actions: <Widget>[action],
      );
    },
  );
}
