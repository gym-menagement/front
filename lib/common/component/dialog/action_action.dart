import 'package:flutter/material.dart';

class ActionAction extends StatelessWidget {
  final VoidCallback? prevFunc;
  final VoidCallback? nextFunc;

  const ActionAction({
    super.key,
    this.prevFunc,
    this.nextFunc,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          if (prevFunc != null)
            OutlinedButton(
              style: OutlinedButton.styleFrom(
                fixedSize: const Size(120, 48),
                backgroundColor: Colors.white,
                elevation: 0,
                side: const BorderSide(
                  color: Colors.black,
                  width: 1,
                ),
              ),
              onPressed: prevFunc!,
              child: const Text(
                '취소',
                style: TextStyle(
                  color: Colors.black,
                ),
              ),
            ),
          const SizedBox(width: 16),
          if (nextFunc != null)
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                fixedSize: const Size(120, 48),
                backgroundColor: Colors.black,
                elevation: 0,
              ),
              onPressed: nextFunc!,
              child: const Text(
                '등록',
                style: TextStyle(
                  color: Colors.white,
                ),
              ),
            ),
        ],
      ),
    );
  }
}
