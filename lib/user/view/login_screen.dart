import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:go_router/go_router.dart';
import 'package:gym/common/component/layout/default_layout.dart';
import 'package:gym/common/const/colors.dart';
import 'package:gym/membership/views/membership_screen.dart';
import 'package:gym/user/provider/user_me_provider.dart';

class LoginScreen extends ConsumerStatefulWidget {
  static String get routeName => 'login';

  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  String loginid = '';
  String passwd = '';

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(userMeProvider);

    return DefalutLayout(
      child: SafeArea(
        top: true,
        bottom: false,
        child: Row(
          children: [
            Expanded(
              flex: 14,
              child: Container(
                color: PRIMARY_COLOR,
                child: Padding(
                  padding: const EdgeInsets.only(right: 109.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          SizedBox(
                            width: 115.09,
                            height: 45,
                            child: SvgPicture.asset(
                              'asset/img/image/logo.svg',
                              fit: BoxFit.fill,
                            ),
                          ),
                          SizedBox(
                            width: 269,
                            height: 155.52,
                            child: SvgPicture.asset(
                                'asset/img/image/Isolation_mode.svg'),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
            Expanded(
              flex: 8,
              child: Container(
                color: WHITE_COLOR,
                child: Padding(
                  padding: const EdgeInsets.only(left: 60.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Log in',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Color(0xFFCBCBCB),
                          fontSize: 50,
                          fontFamily: 'Outfit',
                          fontWeight: FontWeight.w700,
                          height: 0,
                        ),
                      ),
                      const SizedBox(height: 30),
                      SizedBox(
                        width: 285,
                        height: 40,
                        child: TextField(
                          onChanged: (String value) {
                            loginid = value;
                          },
                          decoration: const InputDecoration(
                            border: UnderlineInputBorder(
                              borderSide: BorderSide(
                                color: Color(0xFFBDBDBD),
                              ),
                            ),
                            hintText: "ID",
                            hintStyle: TextStyle(
                              color: Color(0xFFBDBDBD),
                              fontSize: 12,
                              fontWeight: FontWeight.w400,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 12),
                      SizedBox(
                        width: 285,
                        height: 40,
                        child: TextField(
                          onChanged: (String value) {
                            passwd = value;
                          },
                          decoration: const InputDecoration(
                            border: UnderlineInputBorder(
                              borderSide: BorderSide(
                                color: Color(0xFFBDBDBD),
                              ),
                            ),
                            hintText: "PASSWORD",
                            hintStyle: TextStyle(
                              color: Color(0xFFBDBDBD),
                              fontSize: 12,
                              fontWeight: FontWeight.w400,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 32),
                      SizedBox(
                        width: 285,
                        height: 48,
                        child: ElevatedButton(
                          onPressed: () async {
                            // context.goNamed(MembershipScreen.routeName);
                            ref.read(userMeProvider.notifier).login(
                                  loginid: loginid,
                                  passwd: passwd,
                                );
                          },
                          style: ElevatedButton.styleFrom(
                              backgroundColor: GREY_900_COLOR),
                          child: const Text(
                            'Button',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 14,
                              fontWeight: FontWeight.w700,
                              height: 0,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
