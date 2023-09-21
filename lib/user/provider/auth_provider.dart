import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:gym/employee/views/employee_screen.dart';
import 'package:gym/helth/views/helth_screen.dart';
import 'package:gym/membership/views/membership_screen.dart';
import 'package:gym/user/model/user_me_model.dart';
import 'package:gym/user/model/user_model.dart';
import 'package:gym/user/provider/user_me_provider.dart';
import 'package:gym/user/view/login_screen.dart';

final authProvider = ChangeNotifierProvider<AuthProvider>((ref) {
  return AuthProvider(ref: ref);
});

class AuthProvider extends ChangeNotifier {
  final Ref ref;

  AuthProvider({
    required this.ref,
  }) {
    ref.listen<UserModelBase?>(userMeProvider, (previous, next) {
      if (previous != next) {
        notifyListeners();
      }
    });
  }

  List<GoRoute> get routes => [
        GoRoute(
          path: '/',
          name: LoginScreen.routeName,
          builder: (_, __) => const LoginScreen(),
        ),
        // GoRoute(
        //   path: '/dash',
        //   name: DashBoard.routeName,
        //   builder: (_, __) => const DashBoard(),
        //   routes: [
        //     GoRoute(
        //       path: 'restaurant/:rid',
        //       name: DashBoard.routeName,
        //       builder: (_, state) => DashBoard(
        //         id: state.pathParameters['id']!,
        //       ),
        //     ),
        //   ],
        // ),
        GoRoute(
          path: '/membership',
          name: MembershipScreen.routeName,
          builder: (_, state) => const MembershipScreen(),
        ),
        GoRoute(
          path: '/employee',
          name: EmployeeScreen.routeName,
          builder: (_, state) => const EmployeeScreen(),
        ),
        GoRoute(
          path: '/helth',
          name: HelthScreen.routeName,
          builder: (_, __) => const HelthScreen(),
        ),
        // GoRoute(
        //   path: '/graph',
        //   name: GraphScreen.routeName,
        //   builder: (_, __) => const GraphScreen(),
        // ),
      ];

  logout() {
    ref.read(userMeProvider.notifier).logout();
  }

  String? redirectLogic(GoRouterState state) {
    final UserModelBase? user = ref.read(userMeProvider);
    final logginIn = state.location == '/';

    if (user == null) {
      return logginIn ? null : '/';
    }

    if (user is UserModel) {
      // return logginIn || state.location == '/splash' ? '/' : null;
      return logginIn ? '/membership' : null;
    }

    if (user is UserModelError) {
      return !logginIn ? '/' : null;
    }

    return null;
  }
}
