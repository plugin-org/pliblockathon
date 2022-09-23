import 'package:flutter/material.dart';
import 'package:startup_hub/Screens/home.dart';
import 'package:startup_hub/Screens/idea.dart';
import 'package:startup_hub/Screens/openpatent.dart';
import 'package:startup_hub/Screens/yourpatent.dart';
import '../Screens/settings.dart';

class apdrawer extends StatefulWidget {
  const apdrawer({super.key});

  @override
  State<apdrawer> createState() => _apdrawerState();
}

class _apdrawerState extends State<apdrawer> {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: Colors.white,
      child: ListView(
        children: [
          DrawerHeader(
            decoration: const BoxDecoration(
              color: Colors.blue,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: CircleAvatar(
                    backgroundColor: Colors.white,
                    foregroundColor: Colors.blue,
                    child: Icon(Icons.people),
                    radius: 34,
                  ),
                ),
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text('Your Name',
                              style:
                                  TextStyle(color: Colors.white, fontSize: 16)),
                          SizedBox(height: 5),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          ListTile(
            leading: const Icon(
              Icons.account_circle,
              color: Colors.blue,
            ),
            title: const Text(
              'Your Account',
              style: TextStyle(color: Colors.blue),
            ),
            onTap: () {},
          ),
          ListTile(
            leading: const Icon(
              Icons.pattern,
              color: Colors.blue,
            ),
            title: const Text(
              'Your Patents',
              style: TextStyle(color: Colors.blue),
            ),
            onTap: () => Navigator.push(context,
                MaterialPageRoute(builder: ((context) => yourpatent()))),
          ),
          ListTile(
            leading: const Icon(
              Icons.settings,
              color: Colors.orange,
            ),
            title: const Text(
              'Settings',
              style: TextStyle(color: Colors.orange),
            ),
            onTap: () => Navigator.push(
                context, MaterialPageRoute(builder: ((context) => settings()))),
          ),
        ],
      ),
    );
  }
}

PreferredSizeWidget appBar() {
  return AppBar(
    iconTheme: IconThemeData(color: Colors.blue),
    backgroundColor: Colors.white,
    elevation: 2,
    centerTitle: true,
    title: Text(
      'Startup Hub',
      style: TextStyle(color: Colors.lightBlue),
    ),
  );
}

class bar extends StatefulWidget {
  const bar({super.key});

  @override
  State<bar> createState() => _barState();
}

class _barState extends State<bar> {
  static int _selectedIndex = 0;
  static const List<Widget> _widgetOptions = <Widget>[
    Home(),
    patent(),
    jobs(),
  ];
  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
      Navigator.push(
          context,
          MaterialPageRoute(
              builder: ((context) => _widgetOptions.elementAt(index))));
    });
  }

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      items: const <BottomNavigationBarItem>[
        BottomNavigationBarItem(
            icon: Icon(
              Icons.home,
              color: Colors.blue,
            ),
            label: 'home'),
        BottomNavigationBarItem(
            icon: Icon(
              Icons.pattern,
              color: Colors.blue,
            ),
            label: 'idea'),
        BottomNavigationBarItem(
            icon: Icon(
              Icons.business,
              color: Colors.blue,
            ),
            label: 'patents'),
      ],
      currentIndex: _selectedIndex,
      selectedItemColor: Color.fromARGB(255, 62, 178, 255),
      onTap: _onItemTapped,
    );
    ;
  }
}
