import 'package:startup_hub/Widgets/patentContainer.dart';

import 'package:flutter/material.dart';
import '../Widgets/widgets.dart';

class yourpatent extends StatefulWidget {
  const yourpatent({super.key});
  static const String id = 'home';
  @override
  State<yourpatent> createState() => _yourpatent();
}

class _yourpatent extends State<yourpatent> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(),
      drawer: apdrawer(),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          SizedBox(
            height: 20,
          ),
          Padding(
            padding: EdgeInsets.all(10),
            child: patentContainer(
              teamName: "Startup Hub",
              description: "With Great Power Comes Great Responsibility",
            ),
          ),
        ],
      ),
      bottomNavigationBar: bar(),
    );
  }
}
